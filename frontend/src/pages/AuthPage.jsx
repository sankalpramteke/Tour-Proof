import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Nav, Alert } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import '../components/auth/Auth.css';

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'login');
  
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
  
  const handleGoogleLogin = async () => {
    try {
      // TODO: Implement Google OAuth login
      console.log('Google login clicked');
    } catch (err) {
      setError(err.message || 'Failed to login with Google.');
    }
  };
  
  return (
    <div className="auth-page-wrapper">
      <div className="auth-form-container">
        <Container fluid>
          <Row className="auth-split-layout">
            <Col md={6} className="auth-image-section">
              <div className="auth-image-wrapper">
                <img 
                  src="/images/auth-bg.jpg" 
                  alt="Beautiful tour destination" 
                  className="auth-bg-image"
                />
                <div className="auth-image-overlay">
                  <h2>Discover Amazing Places</h2>
                  <p>Verify your travels and earn rewards</p>
                </div>
              </div>
            </Col>
            <Col md={6} className="auth-form-section">
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
                    <button
                      className="btn btn-outline-primary w-100 mt-3"
                      onClick={handleGoogleLogin}
                    >
                      <i className="bi bi-google me-2"></i>
                      Continue with Google
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AuthPage;