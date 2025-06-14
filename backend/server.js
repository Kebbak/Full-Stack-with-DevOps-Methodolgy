const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movie');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Add a simple root route for browser testing
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

// Stripe subscription endpoint
app.post('/api/create-subscription', async (req, res) => {
  const { paymentMethodId, email, priceId } = req.body;
  try {
    const customer = await stripe.customers.create({
      email,
      payment_method: paymentMethodId,
      invoice_settings: { default_payment_method: paymentMethodId }
    });
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent']
    });
    res.json({
      clientSecret: subscription.latest_invoice.payment_intent.client_secret
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Stripe Checkout route (one-time or subscription via redirect)
app.post('/api/create-checkout-session', async (req, res) => {
  const { plan } = req.body;
  let priceId;

  // Map frontend plan to Stripe price ID
  switch (plan.toLowerCase()) {
    case 'basic':
      priceId = 'price_123basic'; // Replace with your real Stripe price ID
      break;
    case 'standard':
      priceId = 'price_123standard';
      break;
    case 'premium':
      priceId = 'price_123premium';
      break;
    default:
      return res.status(400).json({ error: 'Invalid plan selected' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/subscribe',
    });

    res.json({ sessionUrl: session.url });
  } catch (error) {
    console.error('Stripe session error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});
app.post('/api/send-signup-link', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    // Generate a token valid for 15 minutes
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const signupLink = `http://localhost:3000/signup?token=${token}`; // Adjust link to frontend route

    // Configure transporter (for Gmail or SMTP provider)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,      // your gmail or email address
        pass: process.env.EMAIL_PASS       // your app password or SMTP password
      }
    });

    const mailOptions = {
      from: `"Netflix Clone" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Complete your sign-up',
      html: `
        <p>Hi,</p>
        <p>Click the link below to finish signing up and create your password-free account:</p>
        <a href="${signupLink}">${signupLink}</a>
        <p>This link will expire in 15 minutes.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Signup link sent successfully' });
  } catch (error) {
    console.error('Error sending signup link:', error);
    res.status(500).json({ error: 'Failed to send signup link' });
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));