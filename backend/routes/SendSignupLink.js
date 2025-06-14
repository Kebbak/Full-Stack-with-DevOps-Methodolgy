// src/routes/sendSignupLink.ts
import { Router } from 'express';
import payload from 'payload';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/send-signup-link', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  // Generate signup token (valid for 30 mins, for example)
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '30m' });

  const signupLink = `${process.env.CLIENT_URL}/complete-signup?token=${token}`;

  // Send the email (you can integrate SendGrid, Mailgun, Nodemailer, etc.)
  await payload.sendEmail({
    to: email,
    subject: 'Complete Your Signup',
    html: `
      <h2>Welcome to Netflix Clone!</h2>
      <p>Click below to finish your signup:</p>
      <a href="${signupLink}">${signupLink}</a>
    `,
  });

  res.json({ message: 'Signup link sent' });
});

export default router;