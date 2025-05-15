import { Link } from 'react-router-dom';

const Footer = () => {
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
          </div>

          <div className="footer-links">
            <div className="footer-links-column">
              <h3>Platform</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/listings">Explore Listings</Link></li>
                <li><Link to="/about">How It Works</Link></li>
                <li><Link to="/about">Blockchain Verification</Link></li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3>Company</h3>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/about">Our Team</Link></li>
                <li><Link to="/about">Careers</Link></li>
                <li><Link to="/about">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3>Legal</h3>
              <ul>
                <li><Link to="/about">Terms of Service</Link></li>
                <li><Link to="/about">Privacy Policy</Link></li>
                <li><Link to="/about">Cookie Policy</Link></li>
                <li><Link to="/about">Trust & Safety</Link></li>
              </ul>
            </div>

            <div className="footer-links-column">
              <h3>Connect</h3>
              <ul className="social-links">
                <li><a href="https://twitter.com/tourproof" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                <li><a href="https://facebook.com/tourproof" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li><a href="https://instagram.com/tourproof" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://linkedin.com/company/tourproof" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; {currentYear} TourProof. All rights reserved.</p>
          </div>
          <div className="blockchain-info">
            <p>Powered by Ethereum blockchain technology</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;