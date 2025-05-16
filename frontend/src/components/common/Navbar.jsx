import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Container, Dropdown } from 'react-bootstrap';
import { BsPerson } from 'react-icons/bs';
import MetaMaskConnect from './MetaMaskConnect';
import logo from '../../assets/TourProof Logo.png';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleAuth = (type) => {
    navigate(`/${type}`);
  };

  return (
    <div className="navbar-wrapper">
      <BootstrapNavbar expand="lg" className="navbar">
        <Container className="navbar-container">
        <BootstrapNavbar.Brand as={Link} to="/" className="navbar-logo">
          <img src={logo} alt="TourProof" height="40" />
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
        <BootstrapNavbar.Collapse id="navbar-nav">
          <div className="navbar-links ms-auto">
            <Link 
              to="/listings" 
              className="nav-link" 
              style={isActive('/listings') ? { color: 'var(--primary)' } : {}}
            >
              Listings
            </Link>
            <Link 
              to="/about" 
              className="nav-link" 
              style={isActive('/about') ? { color: 'var(--primary)' } : {}}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="nav-link" 
              style={isActive('/contact') ? { color: 'var(--primary)' } : {}}
            >
              Contact
            </Link>
            <MetaMaskConnect className="nav-button connect-wallet" />
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" id="auth-dropdown" className="auth-icon-button">
                <BsPerson size={24} />
              </Dropdown.Toggle>
              <Dropdown.Menu className="auth-dropdown-menu">
                <Dropdown.Item onClick={() => handleAuth('login')}>Login</Dropdown.Item>
                <Dropdown.Item onClick={() => handleAuth('signup')}>Sign Up</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </div>
  );
};

export default Navbar;