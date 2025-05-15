import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import MetaMaskConnect from './MetaMaskConnect';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold text-primary">
          TourProof
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active={isActive('/')}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/listings" active={isActive('/listings')}>
              Explore
            </Nav.Link>
            <Nav.Link as={Link} to="/about" active={isActive('/about')}>
              About
            </Nav.Link>
          </Nav>
          
          <Nav>
            {isAuthenticated ? (
              <>
                <MetaMaskConnect />
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/auth?action=login">
                  Login
                </Nav.Link>
                <Button
                  as={Link}
                  to="/auth?action=signup"
                  variant="primary"
                  className="ms-2"
                >
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;