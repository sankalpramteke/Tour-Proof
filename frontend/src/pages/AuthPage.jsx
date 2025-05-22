import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import GoogleLogin from '../components/GoogleLogin';
import '../components/auth/Auth.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signup, handleGoogleSuccess } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle Google OAuth redirect
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    const state = params.get('state');

    if (accessToken) {
      const handleRedirect = async () => {
        try {
          await handleGoogleSuccess({ access_token: accessToken });
          const redirectTo = state ? JSON.parse(state).from : '/';
          navigate(redirectTo);
        } catch (err) {
          setError('Failed to complete Google login');
        }
      };
      handleRedirect();
    }
  }, [location, handleGoogleSuccess, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup({ email, password });
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'Authentication failed');
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      await handleGoogleSuccess(response);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to login with Google.');
    }
  };

  const handleGoogleLoginError = (error) => {
    console.error('Google login failed:', error);
    setError('Failed to login with Google');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card style={{ backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: '12px' }}>
            <Card.Body className="p-4" style={{ color: '#fff' }}>
              <h2 className="text-center mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <div className="text-center mb-4">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={handleGoogleLoginError}
                />
                <div className="mt-3 mb-3" style={{ color: '#666', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#333' }} />
                  <span>or</span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#333' }} />
                </div>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      backgroundColor: '#2A2A2A',
                      border: '1px solid #333',
                      color: '#fff',
                      padding: '12px',
                      borderRadius: '8px',
                      '::placeholder': {
                        color: '#666'
                      },
                      ':focus': {
                        backgroundColor: '#2A2A2A',
                        borderColor: '#C1FF72',
                        boxShadow: '0 0 0 0.2rem rgba(193, 255, 114, 0.25)'
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      backgroundColor: '#2A2A2A',
                      border: '1px solid #333',
                      color: '#fff',
                      padding: '12px',
                      borderRadius: '8px',
                      '::placeholder': {
                        color: '#666'
                      },
                      ':focus': {
                        backgroundColor: '#2A2A2A',
                        borderColor: '#C1FF72',
                        boxShadow: '0 0 0 0.2rem rgba(193, 255, 114, 0.25)'
                      }
                    }}
                  />
                </Form.Group>
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100"
                  style={{
                    backgroundColor: '#C1FF72',
                    border: 'none',
                    color: '#1A1A1A',
                    fontWeight: '600',
                    padding: '12px',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease-in-out',
                    ':hover': {
                      backgroundColor: '#A8FF43'
                    }
                  }}
                >
                  {isLogin ? 'Login' : 'Sign Up'}
                </Button>
              </Form>
              <div className="text-center mt-3">
                <Button
                  variant="link"
                  onClick={() => setIsLogin(!isLogin)}
                  style={{ color: '#C1FF72', textDecoration: 'none' }}
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : 'Already have an account? Login'}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;