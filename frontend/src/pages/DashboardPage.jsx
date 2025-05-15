import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Nav, Alert, Image } from 'react-bootstrap';
import UserProfile from '../components/dashboard/UserProfile';
import UserBookings from '../components/dashboard/UserBookings';
import UserReviews from '../components/dashboard/UserReviews';
import { useAuth } from '../hooks/useAuth';
import { useWallet } from '../hooks/useWallet';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, isAuthenticated, isLoading } = useAuth();
  const { walletBalance } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile user={user} />;
      case 'bookings':
        return <UserBookings userId={user?.id} />;
      case 'reviews':
        return <UserReviews userId={user?.id} />;
      default:
        return <UserProfile user={user} />;
    }
  };

  return (
    <Container className="my-5">
      <Card className="shadow-sm">
        <Card.Body>
          <Row className="g-4">
            {/* Sidebar */}
            <Col md={4} lg={3}>
              <Card className="bg-light">
                <Card.Body className="text-center">
                  <div className="mb-3">
                    {user?.profileImage ? (
                      <Image
                        src={user.profileImage}
                        alt={user.username}
                        roundedCircle
                        style={{ width: '96px', height: '96px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div 
                        className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '96px', height: '96px', margin: '0 auto' }}
                      >
                        <span className="h3 mb-0 text-primary">
                          {user?.username?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                  </div>
                  <h4 className="mb-1">{user?.username || 'User'}</h4>
                  <p className="text-muted small mb-3">{user?.email}</p>
                  
                  {walletBalance !== null && (
                    <Alert variant="primary" className="text-center p-2 mb-0">
                      <small className="d-block">Token Balance</small>
                      <strong>{walletBalance} TPT</strong>
                    </Alert>
                  )}
                </Card.Body>
                
                <Card.Footer className="bg-transparent">
                  <Nav className="flex-column" variant="pills">
                    <Nav.Item>
                      <Nav.Link 
                        active={activeTab === 'profile'}
                        onClick={() => setActiveTab('profile')}
                        className="text-start"
                      >
                        <i className="bi bi-person me-2"></i>
                        Profile
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link 
                        active={activeTab === 'bookings'}
                        onClick={() => setActiveTab('bookings')}
                        className="text-start"
                      >
                        <i className="bi bi-calendar-check me-2"></i>
                        My Bookings
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link 
                        active={activeTab === 'reviews'}
                        onClick={() => setActiveTab('reviews')}
                        className="text-start"
                      >
                        <i className="bi bi-star me-2"></i>
                        My Reviews
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Footer>
              </Card>
            </Col>
            
            {/* Main Content */}
            <Col md={8} lg={9}>
              {renderTabContent()}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DashboardPage;