import { useLocation, useNavigate } from 'react-router-dom';
import './FinishSetup.css';
import { useState } from 'react';

function FinishSetup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') || 'your@email.com';

  const handleSendLink = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/send-signup-link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Sign-up link sent to ${email}`);
        navigate('/profiles');
      } else {
        setError(data?.error || 'Failed to send sign-up link.');
      }
    } catch (err) {
      console.error('Send link error:', err);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="setup-container">
      <header className="setup-header">
        <img src="/logo.png" alt="Netflix" className="logo" />
        <a href="/login" className="signin-link">Sign In</a>
      </header>

      <main className="setup-main">
        <div className="device-icons">
          <img src="/tv-icon.png" alt="TV" />
          <img src="/computer-icon.png" alt="Computer" />
          <img src="/mobile-icon.png" alt="Mobile" />
        </div>
        <h2>STEP 2 OF 3</h2>
        <h1>Finish setting up your account</h1>
        <p>We'll send a sign-up link to <strong>{email}</strong> so you can use Netflix without a password on any device at any time.</p>

        <label className="checkbox">
          <input type="checkbox" />
          Please do not email me Netflix special offers.
        </label>

        <button className="send-link-btn" onClick={handleSendLink} disabled={loading}>
          {loading ? 'Sending...' : 'Send Link'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </main>

      <footer className="setup-footer">
        <p>Questions? <a href="#">Contact us.</a></p>
      </footer>
    </div>
  );
}

export default FinishSetup;