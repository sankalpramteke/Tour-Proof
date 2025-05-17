import { Link } from 'react-router-dom';
import './Footer.css';
import { FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <Link to="/">
              <img src="/logo.svg" alt="TourProof" />
              <span>TourProof</span>
            </Link>
            <p className="tagline">Authentic reviews. Verified journeys.</p>
            <div className="social-links">
              <a href="https://twitter.com/tourproof" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com/tourproof" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com/company/tourproof" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-links-column">
              <h3>How can we help?</h3>
              <ul>
                <li><Link to="/contact">Contact us</Link></li>
                <li><Link to="/help">Help center</Link></li>
                <li><Link to="/status">Status</Link></li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3>Platform</h3>
              <ul>
                <li><Link to="/listings">Explore Listings</Link></li>
                <li><Link to="/about">How It Works</Link></li>
                <li><Link to="/about">Blockchain Verification</Link></li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3>Company</h3>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3>Legal</h3>
              <ul>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/security">Security</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <div className="help-links">
              <a href="/contact">Contact us</a>
              <a href="/help">Help center</a>
              <a href="/status">Status</a>
            </div>
          </div>
          
          <div className="footer-bottom-right">
            <div className="app-actions">
              <a href="#" className="app-download">
                <i className="bi bi-apple"></i>
                Get the app
              </a>
              <div className="language-selector">
                🌐 English
              </div>
            </div>
            <div className="copyright">
              <p>&copy; {currentYear} TourProof. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;