import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const LoginForm = () => {
  const [showLogin, setShowLogin] = useState(true);
  
  const handleLoginSubmit = (formData) => {
    console.log('Login submitted:', formData);
    // Add actual login logic here
  };
  
  const handleSignupSubmit = (formData) => {
    console.log('Signup submitted:', formData);
    // Add actual signup logic here
  };
  
  return (
    <div className="auth-container">
      <div className="auth-overlay">
        {showLogin ? (
          <LoginPage 
            onSubmit={handleLoginSubmit} 
            switchToSignup={() => setShowLogin(false)} 
          />
        ) : (
          <SignupPage 
            onSubmit={handleSignupSubmit} 
            switchToLogin={() => setShowLogin(true)} 
          />
        )}
        
        <div className="auth-quote-section">
          <div className="auth-quote">
            <h1>THE GOAL OF LIFE IS LIVING IN AGREEMENT WITH NATURE.</h1>
            <div className="auth-social-icons">
              <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginPage = ({ onSubmit, switchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <div className="auth-form-container">
      <div className="auth-form-card">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-flex">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Remember me?</label>
            </div>
            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
          </div>
          
          <button type="submit" className="auth-button primary-button">LOGIN</button>
          
          <div className="oauth-divider">
            <span>or</span>
          </div>
          
          <div className="oauth-options">
            <button type="button" className="oauth-button apple">
              <img src="/images/apple-logo.svg" alt="Apple" />
            </button>
            <button type="button" className="oauth-button google">
              <img src="/images/google-logo.svg" alt="Google" />
            </button>
            <button type="button" className="oauth-button twitter">
              <img src="/images/twitter-logo.svg" alt="Twitter" />
            </button>
          </div>
          
          <div className="switch-form">
            <p>Don't have an account? <button type="button" onClick={switchToSignup} className="switch-button">Sign Up</button></p>
          </div>
        </form>
      </div>
    </div>
  );
};

const SignupPage = ({ onSubmit, switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <div className="auth-form-container">
      <div className="auth-form-card">
        <h2>Journey Begins</h2>
        <h3>Explore More, Experience Life</h3>
        
        <div className="signup-buttons">
          <button type="button" className="signup-button">Sign Up</button>
          <button type="button" className="login-button" onClick={switchToLogin}>Log In</button>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="oauth-options signup-oauth">
            <button type="button" className="oauth-button apple">
              <img src="/images/apple-logo.svg" alt="Apple" />
            </button>
            <button type="button" className="oauth-button google">
              <img src="/images/google-logo.svg" alt="Google" />
            </button>
            <button type="button" className="oauth-button twitter">
              <img src="/images/twitter-logo.svg" alt="Twitter" />
            </button>
          </div>
          
          <div className="oauth-divider">
            <span>or</span>
          </div>
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="att_trekker"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="signup-password">Password</label>
            <div className="password-input-container">
              <input
                type="password"
                id="signup-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="button" className="password-toggle">
                <i className="fas fa-eye"></i>
              </button>
            </div>
          </div>
          
          <div className="form-check">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
            />
            <label htmlFor="agreeTerms">Remember me</label>
            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
          </div>
          
          <button type="submit" className="auth-button primary-button signup">LOG IN</button>
          
          <div className="switch-form">
            <p>Already have an account? <button type="button" onClick={switchToLogin} className="switch-button">Log In</button></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;