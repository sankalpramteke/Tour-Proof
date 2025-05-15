import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Button, Card, Badge, Row, Col, Alert } from 'react-bootstrap';
import { bookingsService } from '../../services/bookings.service';
import LoadingSpinner from '../common/LoadingSpinner';

const UserBookings = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const data = await bookingsService.getUserBookings(userId);
        setBookings(data);
        setError(null);
      } catch (err) {
        setError('Failed to load bookings. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  const getFilteredBookings = () => {
    const now = new Date();

    if (activeTab === 'upcoming') {
      return bookings.filter(booking => new Date(booking.start_date) >= now && booking.status !== 'canceled');
    } else if (activeTab === 'past') {
      return bookings.filter(booking => new Date(booking.end_date) < now || booking.status === 'completed');
    } else if (activeTab === 'canceled') {
      return bookings.filter(booking => booking.status === 'canceled');
    }
    return bookings;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'completed':
        return 'primary';
      case 'canceled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const canLeaveReview = (booking) => {
    const now = new Date();
    return (
      booking.status === 'completed' || 
      (booking.status === 'confirmed' && new Date(booking.end_date) < now)
    );
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Alert variant="danger">
        {error}
      </Alert>
    );
  }

  const filteredBookings = getFilteredBookings();

  return (
    <div>
      <div className="mb-4">
        <h3 className="mb-4">My Bookings</h3>
        
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'upcoming'}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'past'}
              onClick={() => setActiveTab('past')}
            >
              Past
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'canceled'}
              onClick={() => setActiveTab('canceled')}
            >
              Canceled
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No {activeTab} bookings found.</p>
          {activeTab !== 'upcoming' && (
            <Button
              variant="link"
              onClick={() => setActiveTab('upcoming')}
            >
              View upcoming bookings
            </Button>
          )}
          {activeTab === 'upcoming' && (
            <div className="mt-3">
              <Link 
                to="/listings" 
                className="btn btn-primary"
              >
                Explore listings
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="d-grid gap-3">
          {filteredBookings.map(booking => (
            <Card key={booking.booking_id} className="shadow-sm">
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <h5 className="mb-3">{booking.listing?.title || 'Listing'}</h5>
                    <div className="mb-3">
                      <span className="me-2">{formatDate(booking.start_date)} - {formatDate(booking.end_date)}</span>
                      <Badge bg={getStatusVariant(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-muted">
                      <p className="mb-1">
                        <strong>Guests:</strong> {booking.number_of_guests}
                      </p>
                      <p className="mb-0">
                        <strong>Total:</strong> ${booking.total_price}
                      </p>
                    </div>
                  </Col>
                  <Col md={4} className="text-md-end mt-3 mt-md-0">
                    <div className="d-grid gap-2">
                      <Link 
                        to={`/listings/${booking.listing_id}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        View listing
                      </Link>
                      {canLeaveReview(booking) && (
                        <Link 
                          to={`/review/${booking.booking_id}`}
                          className="btn btn-primary btn-sm"
                        >
                          Leave review
                        </Link>
                      )}
                      {booking.blockchain_receipt_hash && (
                        <Button 
                          variant="link"
                          size="sm"
                          onClick={() => window.open(`https://etherscan.io/tx/${booking.blockchain_receipt_hash}`, '_blank')}
                        >
                          View receipt on blockchain
                        </Button>
                      )}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookings;