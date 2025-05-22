import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Container, Dropdown, Image } from 'react-bootstrap';
import { BsPerson, BsBoxArrowRight } from 'react-icons/bs';
import { useAuth } from '../../hooks/useAuth';
import MetaMaskConnect from './MetaMaskConnect';
import logo from '../../assets/TourProof Logo.png';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleAuth = (type) => {
    navigate('/auth', { state: { activeTab: type } });
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
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
            <MetaMaskConnect />
            {currentUser ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  id="user-dropdown"
                  className="nav-link p-0 d-flex align-items-center"
                >
                  {currentUser.picture ? (
                    <Image
                      src={currentUser.picture}
                      alt={currentUser.name}
                      roundedCircle
                      width={32}
                      height={32}
                    />
                  ) : (
                    <BsPerson size={24} />
                  )}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ backgroundColor: '#1A1A1A', border: '1px solid #333' }}>
                  <Dropdown.Item
                    as={Link}
                    to="/profile"
                    className="text-light"
                    style={{ ':hover': { backgroundColor: '#2A2A2A' } }}
                  >
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to="/my-bookings"
                    className="text-light"
                    style={{ ':hover': { backgroundColor: '#2A2A2A' } }}
                  >
                    My Bookings
                  </Dropdown.Item>
                  <Dropdown.Divider className="border-secondary" />
                  <Dropdown.Item
                    onClick={handleLogout}
                    className="text-light"
                    style={{ ':hover': { backgroundColor: '#2A2A2A' } }}
                  >
                    <BsBoxArrowRight className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <button
                onClick={() => handleAuth('login')}
                className="btn btn-dark ms-2"
                style={{
                  backgroundColor: '#1A1A1A',
                  border: '1px solid #333',
                  color: '#fff'
                }}
              >
                <BsPerson className="me-2" />
                Login
              </button>
            )}
          </div>
        </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </div>
  );
};

export default Navbar;