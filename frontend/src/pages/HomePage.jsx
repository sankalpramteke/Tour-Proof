import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { listingsService } from '../services/listings.service';

const HomePage = () => {
  const [popularListings, setPopularListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularListings = async () => {
      try {
        const response = await listingsService.getPopularListings();
        setPopularListings(response.data.slice(0, 4) || []); // Show only 4 listings
      } catch (error) {
        console.error('Error fetching popular listings:', error);
        setPopularListings([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchPopularListings();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center text-center py-5">
            <Col>
              <h1 className="display-4 mb-4">Authentic reviews. Verified journeys.</h1>
              <p className="lead mb-4">Experience travel with confidence through blockchain-verified reviews and seamless bookings</p>
              <div className="d-flex gap-3 justify-content-center">
                <Link to="/listings" className="btn btn-light btn-lg">Explore Destinations</Link>
                <Link to="/about" className="btn btn-outline-light btn-lg">Learn More</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <h2 className="text-center mb-5">Why Choose TourProof</h2>
          <Row className="g-4">
            <Col md={3}>
              <Card className="h-100 text-center p-3">
                <Card.Body>
                  <div className="display-4 mb-3">🔐</div>
                  <Card.Title>Blockchain Verified</Card.Title>
                  <Card.Text>Every review is confirmed through blockchain technology, ensuring authenticity</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 text-center p-3">
                <Card.Body>
                  <div className="display-4 mb-3">🏆</div>
                  <Card.Title>Earn Rewards</Card.Title>
                  <Card.Text>Get tokens for verified reviews that you can use for discounts on future bookings</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 text-center p-3">
                <Card.Body>
                  <div className="display-4 mb-3">👥</div>
                  <Card.Title>Trusted Community</Card.Title>
                  <Card.Text>Join thousands of travelers sharing real experiences</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="h-100 text-center p-3">
                <Card.Body>
                  <div className="display-4 mb-3">💯</div>
                  <Card.Title>Direct Booking</Card.Title>
                  <Card.Text>Book directly through our platform with confidence</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Popular Listings Section */}
      <section className="popular-listings-section py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Popular Destinations</h2>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Row className="g-4">
              {popularListings.length > 0 ? (
                popularListings.map((listing) => (
                  <Col key={listing.id} md={6} lg={3}>
                    <Card className="h-100 listing-card">
                      <Card.Img
                        variant="top"
                        src={listing.images?.[0] || '/placeholder-image.jpg'}
                        alt={listing.title}
                      />
                      <div className="position-absolute top-0 end-0 m-2">
                        <span className="badge bg-success">✓ Verified</span>
                      </div>
                      <Card.Body>
                        <Card.Title>{listing.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{listing.location}</Card.Subtitle>
                        <div className="mb-2">
                          <span className="text-warning">★</span>
                          {listing.averageRating?.toFixed(1) || 'New'}
                          {listing.reviewCount ? ` (${listing.reviewCount} reviews)` : ''}
                        </div>
                        <p className="card-text">
                          ${listing.priceRange?.min} - ${listing.priceRange?.max} / night
                        </p>
                        <Link
                          to={`/listings/${listing.id}`}
                          className="btn btn-outline-primary w-100"
                        >
                          View Details
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col className="text-center">
                  <p>No listings available at the moment.</p>
                </Col>
              )}
            </Row>
          )}
          <div className="text-center mt-5">
            <Link to="/listings" className="btn btn-primary btn-lg">View All Destinations</Link>
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section py-5">
        <Container>
          <h2 className="text-center mb-5">How TourProof Works</h2>
          <Row className="align-items-center text-center g-4">
            <Col md={4}>
              <Card className="border-0 bg-transparent h-100">
                <Card.Body>
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                    1
                  </div>
                  <Card.Title>Browse & Book</Card.Title>
                  <Card.Text>Find your perfect destination from our verified listings and book securely</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 bg-transparent h-100">
                <Card.Body>
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                    2
                  </div>
                  <Card.Title>Enjoy Your Stay</Card.Title>
                  <Card.Text>Experience your journey with confidence in the authenticity of reviews</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 bg-transparent h-100">
                <Card.Body>
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                    3
                  </div>
                  <Card.Title>Share & Earn</Card.Title>
                  <Card.Text>Leave your own verified review and earn tokens for future discounts</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-5">
        <Container>
          <h2 className="text-center mb-5">What Our Users Say</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <Card.Text className="mb-4 font-italic">
                    "TourProof changed how I travel. Knowing reviews are verified gives me peace of mind when booking."
                  </Card.Text>
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                      JD
                    </div>
                    <div className="text-start">
                      <h5 className="mb-0">Jane Doe</h5>
                      <small className="text-muted">Verified Traveler</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <Card.Text className="mb-4 font-italic">
                    "As a hotel owner, I love that only actual guests can leave reviews. It's finally a fair system!"
                  </Card.Text>
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                      JS
                    </div>
                    <div className="text-start">
                      <h5 className="mb-0">John Smith</h5>
                      <small className="text-muted">Property Owner</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <Card.Text className="mb-4 font-italic">
                    "The token rewards are great! I've already saved over $200 on bookings from my review rewards."
                  </Card.Text>
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                      AK
                    </div>
                    <div className="text-start">
                      <h5 className="mb-0">Alex Kim</h5>
                      <small className="text-muted">Frequent Traveler</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="cta-section py-5 bg-primary text-white text-center">
        <Container>
          <h2 className="display-5 mb-4">Ready to experience authentic travel?</h2>
          <p className="lead mb-4">Join TourProof today and discover a new way to travel with confidence.</p>
          <Link to="/auth" className="btn btn-light btn-lg px-5">Sign Up Now</Link>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;