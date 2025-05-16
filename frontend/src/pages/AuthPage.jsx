import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Nav, Alert } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { useWallet } from '../hooks/useWallet';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import MetaMaskConnect from '../components/auth/MetaMaskConnect';
import '../components/auth/Auth.css';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();
  const { connectWallet, wallet } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the return URL from location state or default to home
  const from = location.state?.from?.pathname || '/';
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
  };
  
  const handleLogin = async (credentials) => {
    try {
      await login(credentials.email, credentials.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };
  
  const handleSignup = async (userData) => {
    try {
      await signup(userData);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    }
  };
  
  const handleWalletConnect = async () => {
    try {
      await connectWallet();
      // Additional steps to link wallet to user account would go here
    } catch (err) {
      setError(err.message || 'Failed to connect wallet.');
    }
  };
  
  return (
    <div className="auth-form-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-0">
              <Nav variant="tabs" className="mb-4 auth-tabs">
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'login'}
                    onClick={() => handleTabChange('login')}
                  >
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={activeTab === 'signup'}
                    onClick={() => handleTabChange('signup')}
                  >
                    Sign Up
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              
              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
              
              <div className="mt-4">
                {activeTab === 'login' ? (
                  <LoginForm onSubmit={handleLogin} />
                ) : (
                  <SignupForm onSubmit={handleSignup} />
                )}
              </div>
              
              <div className="text-center my-4">
                <div className="position-relative">
                  <hr />
                  <div className="position-absolute top-50 start-50 translate-middle px-3 bg-white">
                    <span className="text-muted">OR</span>
                  </div>
                </div>
              </div>
              
              <div className="wallet-auth">
                <MetaMaskConnect 
                  onConnect={handleWalletConnect} 
                  isConnected={wallet.connected}
                  walletAddress={wallet.address}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default AuthPage;