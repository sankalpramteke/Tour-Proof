import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useWallet } from '../../hooks/useWallet';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { wallet, connectWallet } = useWallet();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo">
            <img src="/logo.svg" alt="TourProof" />
            <span>TourProof</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/listings">Listings</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>

        {/* User Actions */}
        <div className="user-actions">
          {currentUser ? (
            <>
              <Link to="/dashboard" className="user-profile">
                <img 
                  src={currentUser.profileImage || '/default-avatar.png'} 
                  alt={currentUser.username} 
                  className="avatar"
                />
                <span className="username">{currentUser.username}</span>
              </Link>
              {!wallet.connected ? (
                <button onClick={handleConnectWallet} className="btn btn-outline wallet-btn">
                  <span className="wallet-icon">📱</span> Connect Wallet
                </button>
              ) : (
                <div className="wallet-info">
                  <span className="wallet-address">
                    {wallet.address?.substring(0, 6)}...{wallet.address?.substring(38)}
                  </span>
                  <span className="token-balance">{wallet.balance} TPT</span>
                </div>
              )}
              <button onClick={handleLogout} className="btn btn-outline logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/auth" className="btn btn-primary">Login / Signup</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <span className="menu-icon">☰</span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav">
          <ul className="mobile-nav-links">
            <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/listings" onClick={() => setMobileMenuOpen(false)}>Listings</Link></li>
            <li><Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link></li>
            {currentUser ? (
              <>
                <li><Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link></li>
                {!wallet.connected && (
                  <li>
                    <button onClick={() => { handleConnectWallet(); setMobileMenuOpen(false); }} className="mobile-btn">
                      Connect Wallet
                    </button>
                  </li>
                )}
                <li><button onClick={handleLogout} className="mobile-btn">Logout</button></li>
              </>
            ) : (
              <li><Link to="/auth" onClick={() => setMobileMenuOpen(false)}>Login / Signup</Link></li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;