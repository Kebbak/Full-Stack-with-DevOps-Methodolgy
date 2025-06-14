import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from "react";
import heroImage from "../assets/hero-bg.jpg";
import logo from "../assets/netflix-logo.svg";
import "../styles/landing.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const LandingPage = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (emailInput.trim()) {
      // Example: Navigate to signup with email param
      navigate(`/finish-setup?email=${encodeURIComponent(emailInput)}`);
    } else {
      alert("Please enter a valid email address.");
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );
      const data = await response.json();
      setTrendingMovies(data.results);
    } catch (error) {
      console.error("Failed to fetch trending movies:", error);
    }
  };

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const scrollAmount = () => {
    const container = carouselRef.current;
    if (!container) return 0;

    const card = container.querySelector(".trending-card");
    if (!card) return 0;

    const style = window.getComputedStyle(card);
    const marginRight = parseInt(style.marginRight);
    const cardWidth = card.offsetWidth + marginRight;

    return cardWidth * 5;
  };

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: scrollAmount(), behavior: "smooth" });
  };

  const renderEmailForm = () => (
    <>
      <p>Ready to watch? Enter your email to create or restart your membership.</p>
      <div className="email-form" role="form" aria-label="Email signup form">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <button onClick={handleGetStarted}>Get Started</button>
      </div>
    </>
  );

  const faqs = [
    {
      question: "What is Netflix?",
      answer:
        "Netflix is a streaming service offering a wide variety of award-winning TV shows, movies, anime, documentaries, and more.",
    },
    {
      question: "How much does Netflix cost?",
      answer:
        "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device for a fixed monthly fee. Plans range from $3.99 to $15.99 a month.",
    },
    {
      question: "Where can I watch?",
      answer:
        "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web or on devices with the Netflix app.",
    },
    {
      question: "How do I cancel?",
      answer:
        "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks.",
    },
    {
      question: "What can I watch on Netflix?",
      answer:
        "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more.",
    },
  ];

  return (
         <div className="landing-page">
  {/* HERO SECTION */}
  <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
    <div className="hero-border-left"></div>
    <div className="hero-border-right"></div>
    <div className="overlay"></div>

    <div className="container">
      <div className="hero-header-wrapper">
        <div className="hero-header">
          <img src={logo} alt="Netflix Logo" className="logo" />
          <div className="header-right">
            <select className="language-select" aria-label="Select language">
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
            <button className="sign-in" onClick={() => navigate('/login')}>
              Sign In
            </button>
          </div>
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-highlight">
          <h1>Unlimited movies, TV shows, and more</h1>
          <p>Start at $3.99. Cancel anytime.</p>
          {renderEmailForm()}
        </div>
      </div>
    </div>
  </section>
      {/* TRENDING NOW */}
      <section className="trending-now">
        <div className="container">
          <h2>Trending Now</h2>
          <div className="trending-carousel-wrapper">
            <button className="trending-arrow left" onClick={scrollLeft} aria-label="Scroll left">{"<"}</button>
            <div className="trending-carousel" ref={carouselRef}>
              <div className="trending-carousel-inner">
                {trendingMovies.map((movie, index) => (
                  <div key={movie.id} className="trending-card" title={movie.title}>
                    <div className="rank-number">{index + 1}</div>
                    <div className="netflix-badge">N</div>
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "https://via.placeholder.com/300x450?text=No+Image"
                      }
                      alt={movie.title}
                    />
                  </div>
                ))}
              </div>
            </div>
            <button className="trending-arrow right" onClick={scrollRight} aria-label="Scroll right">{">"}</button>
          </div>
        </div>
      </section>

      {/* REASONS TO JOIN */}
      <section className="section">
        <div className="container">
          <h2>More Reasons to Join Us</h2>
          <div className="reasons-grid">
            <div className="reason-card">
              <div className="icon"><i className="fas fa-tv"></i></div>
              <h3>Enjoy on your TV</h3>
              <p>Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
            </div>
            <div className="reason-card">
              <div className="icon"><i className="fas fa-download"></i></div>
              <h3>Download your shows to watch offline</h3>
              <p>Save your favorites easily and always have something to watch.</p>
            </div>
            <div className="reason-card">
              <div className="icon"><i className="fas fa-globe"></i></div>
              <h3>Watch everywhere</h3>
              <p>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
            </div>
            <div className="reason-card">
              <div className="icon"><i className="fas fa-child"></i></div>
              <h3>Create profiles for kids</h3>
              <p>Send kids on adventures with their favorite characters in a space made just for them - free with your membership.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          {faqs.map((item, index) => (
            <div key={index} className={`faq-item ${expandedFAQ === index ? "expanded" : ""}`}>
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={expandedFAQ === index}
              >
                {item.question}
                <span>{expandedFAQ === index ? "−" : "+"}</span>
              </button>
              <div className="faq-answer"><p>{item.answer}</p></div>
            </div>
          ))}
          <div className="get-started-bottom">{renderEmailForm()}</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="section footer">
        <div className="container">
          <div className="footer-columns">
            <div className="footer-column">
              <a href="/">FAQ</a>
              <a href="/">Investor Relations</a>
              <a href="/">Ways to Watch</a>
              <a href="/">Corporate Information</a>
              <a href="/">Legal Notices</a>
            </div>
            <div className="footer-column">
              <a href="/">Help Center</a>
              <a href="/">Jobs</a>
              <a href="/">Terms of Use</a>
              <a href="/">Contact Us</a>
            </div>
            <div className="footer-column">
              <a href="/">Privacy</a>
              <a href="/">Speed Test</a>
              <a href="/">Account</a>
              <a href="/">Redeem Gift Cards</a>
            </div>
            <div className="footer-column">
              <a href="/">Media Center</a>
              <a href="/">Buy Gift Cards</a>
              <a href="/">Cookie Preferences</a>
              <a href="/">Legal Guarantee</a>
            </div>
          </div>
          <div className="footer-lang">
            <select aria-label="Select language">
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
            <div className="recaptcha-note">
              This page is protected by Google reCAPTCHA to ensure you're not a bot.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;