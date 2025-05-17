import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { listingsService } from '../services/listings.service';
import './HomePage.css';

const HomePage = () => {
  const [popularListings, setPopularListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample listing images for diversity
  const sampleImages = [
    'https://images.unsplash.com/photo-1582610116397-edb318620e96?w=800&auto=format&fit=crop&q=60', // Luxury villa in Goa
    'https://images.unsplash.com/photo-1587974928442-77dc3868d951?w=800&auto=format&fit=crop&q=60', // Mountain retreat
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=60', // City apartment
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=60', // Beach resort
    'https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=800&auto=format&fit=crop&q=60', // Heritage home
    'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800&auto=format&fit=crop&q=60', // Lakeside cottage
  ];

  // Sample Indian locations
  const indianLocations = [
    'Goa, India',
    'Himachal Pradesh, India',
    'Mumbai, India',
    'Kerala, India',
    'Rajasthan, India',
    'Uttarakhand, India',
  ];

  // Sample Indian property names
  const indianPropertyNames = [
    'Seaside Villa Retreat',
    'Himalayan Mountain Lodge',
    'Urban Luxury Apartment',
    'Beachfront Paradise Resort',
    'Royal Heritage Haveli',
    'Peaceful Lakeside Cottage',
  ];

  useEffect(() => {
    const fetchPopularListings = async () => {
      try {
        const response = await listingsService.getPopularListings();
        let listings = response.data.slice(0, 6) || [];
        
        // Enhance listings with Indian themes if they exist
        if (listings.length > 0) {
          listings = listings.map((listing, index) => ({
            ...listing,
            images: [sampleImages[index % sampleImages.length], ...(listing.images || [])],
            title: indianPropertyNames[index % indianPropertyNames.length] || listing.title,
            location: indianLocations[index % indianLocations.length] || listing.location,
          }));
        }
        
        setPopularListings(listings);
      } catch (error) {
        console.error('Error fetching popular listings:', error);
        
        // Create sample listings if API fails
        const sampleListings = [
          {
            id: 'sample-1',
            title: 'Seaside Villa Retreat',
            location: 'Goa, India',
            images: ['https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&auto=format&fit=crop&q=60'],
            averageRating: 4.7,
            reviewCount: 42,
            priceRange: { min: 250, max: 500 }
          },
          {
            id: 'sample-2',
            title: 'Himalayan Mountain Lodge',
            location: 'Himachal Pradesh, India',
            images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=60'],
            averageRating: 4.8,
            reviewCount: 35,
            priceRange: { min: 180, max: 350 }
          },
          {
            id: 'sample-3',
            title: 'Urban Luxury Apartment',
            location: 'Mumbai, India',
            images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=60'],
            averageRating: 4.6,
            reviewCount: 52,
            priceRange: { min: 200, max: 400 }
          },
          {
            id: 'sample-4',
            title: 'Beachfront Paradise Resort',
            location: 'Kerala, India',
            images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=60'],
            averageRating: 4.9,
            reviewCount: 28,
            priceRange: { min: 300, max: 600 }
          },
          {
            id: 'sample-5',
            title: 'Royal Heritage Haveli',
            location: 'Rajasthan, India',
            images: ['https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=800&auto=format&fit=crop&q=60'],
            averageRating: 4.7,
            reviewCount: 45,
            priceRange: { min: 280, max: 550 }
          },
          {
            id: 'sample-6',
            title: 'Peaceful Lakeside Cottage',
            location: 'Uttarakhand, India',
            images: ['https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800&auto=format&fit=crop&q=60'],
            averageRating: 4.5,
            reviewCount: 31,
            priceRange: { min: 150, max: 300 }
          }
        ];
        
        setPopularListings(sampleListings);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularListings();
  }, []);

  // Carousel Effect for Popular Listings
  useEffect(() => {
    // Only run if there are listings and the DOM elements exist
    if (popularListings.length > 0) {
      const carousel = document.getElementById('popularListingsCarousel');
      if (!carousel) return; // Exit if element doesn't exist yet
      
      const items = carousel.querySelectorAll('.carousel-card');
      const indicators = document.querySelectorAll('.carousel-indicator');
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      
      if (!items.length || !prevBtn || !nextBtn) return; // Exit if elements don't exist
      
      let currentIndex = 0; // Start with the first item active
      let autoPlayInterval;
      
      // Function to position items in the carousel
      function positionItems() {
        // Remove all classes first
        items.forEach(item => {
          item.classList.remove('active', 'prev', 'next');
        });
        
        // Calculate indices with wrapping
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        const nextIndex = (currentIndex + 1) % items.length;
        
        // Add appropriate classes
        items[prevIndex].classList.add('prev');
        items[currentIndex].classList.add('active');
        items[nextIndex].classList.add('next');
        
        // Update indicators
        indicators.forEach((indicator, index) => {
          indicator.classList.toggle('active', index === currentIndex);
        });
      }
      
      // Function to move to specific index
      function moveToIndex(index) {
        // Handle wrapping around
        if (index < 0) {
          index = items.length - 1;
        } else if (index >= items.length) {
          index = 0;
        }
        
        currentIndex = index;
        positionItems();
      }
      
      // Function to move to next item
      function moveNext() {
        moveToIndex(currentIndex + 1);
      }
      
      // Function to move to previous item
      function movePrev() {
        moveToIndex(currentIndex - 1);
      }
      
      // Set up click handlers for controls
      prevBtn.addEventListener('click', () => {
        movePrev();
        resetAutoPlay();
      });
      
      nextBtn.addEventListener('click', () => {
        moveNext();
        resetAutoPlay();
      });
      
      // Set up click handlers for indicators
      indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
          moveToIndex(index);
          resetAutoPlay();
        });
      });
      
      // Start autoplay
      function startAutoPlay() {
        autoPlayInterval = setInterval(moveNext, 3000); // Change slide every 3 seconds
      }
      
      // Reset autoplay timer
      function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
      }
      
      // Initialize carousel
      positionItems();
      startAutoPlay();
      
      // Handle window resize
      const handleResize = () => {
        positionItems();
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cleanup function
      return () => {
        clearInterval(autoPlayInterval);
        window.removeEventListener('resize', handleResize);
        
        // Clean up event listeners
        prevBtn?.removeEventListener('click', movePrev);
        nextBtn?.removeEventListener('click', moveNext);
        
        indicators.forEach((indicator, index) => {
          indicator?.removeEventListener('click', () => moveToIndex(index));
        });
      };
    }
  }, [popularListings]); // Only re-run when popularListings changes

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section text-white">
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

      {/* Popular Listings Section - UPDATED */}
      <section className="popular-listings-section py-5">
        <Container>
          <h2 className="popular-destinations-heading">Popular Destinations</h2>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div className="carousel-container">
              <div className="carousel-wrapper" id="popularListingsCarousel">
                {popularListings.length > 0 ? (
                  popularListings.map((listing, index) => (
                    <div 
                      key={listing.id} 
                      className="carousel-card"
                      data-index={index}
                    >
                      <Card className="listing-card" style={{ backgroundColor: '#FBF9EC' }}>
                        <div className="card-image-container">
                          <Card.Img
                            variant="top"
                            src={listing.images?.[0]}
                            alt={listing.title}
                            className="listing-image"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&auto=format&fit=crop&q=60';
                            }}
                          />
                          <div className="verified-badge">
                            <span>✓ Verified</span>
                          </div>
                        </div>
                        <Card.Body>
                          <Card.Title className="listing-title">{listing.title}</Card.Title>
                          <Card.Subtitle className="listing-location">{listing.location}</Card.Subtitle>
                          <div className="rating-container">
                            <span className="star">★</span>
                            <span className="rating-text">
                              {listing.averageRating?.toFixed(1) || 'New'}
                              {listing.reviewCount ? ` (${listing.reviewCount} reviews)` : ''}
                            </span>
                          </div>
                          <p className="price-range">
                            ₹{listing.priceRange?.min} - ₹{listing.priceRange?.max} / night
                          </p>
                          <Link
                            to={`/listings/${listing.id}`}
                            className="view-details-btn"
                          >
                            View Details
                          </Link>
                        </Card.Body>
                      </Card>
                    </div>
                  ))
                ) : (
                  <div className="text-center w-100">
                    <p>No listings available at the moment.</p>
                  </div>
                )}
              </div>
              <div className="carousel-controls mt-4">
                <button className="carousel-nav-btn" id="prevBtn">
                  <i className="bi bi-chevron-left"></i>
                </button>
                <div className="carousel-indicators mx-2">
                  {popularListings.length > 0 && 
                    popularListings.map((_, index) => (
                      <button 
                        key={index}
                        className={`carousel-indicator ${index === 0 ? 'active' : ''}`}
                        data-index={index}
                      ></button>
                    ))
                  }
                </div>
                <button className="carousel-nav-btn" id="nextBtn">
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>
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

      {/* Testimonials Section - Updated with Indian names */}
      <section className="testimonials-section py-5">
        <Container>
          <h2 className="text-center mb-5">What Our Users Say</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm testimonial-card">
                <Card.Body className="text-center">
                  <Card.Text className="mb-4 font-italic">
                    "TourProof changed how I travel. Knowing reviews are verified gives me peace of mind when booking."
                  </Card.Text>
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                      SP
                    </div>
                    <div className="text-start">
                      <h5 className="mb-0">Sneha Patel</h5>
                      <small className="text-muted">Verified Traveler</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm testimonial-card">
                <Card.Body className="text-center">
                  <Card.Text className="mb-4 font-italic">
                    "As a resort owner, I love that only actual guests can leave reviews. It's finally a fair system!"
                  </Card.Text>
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                      RK
                    </div>
                    <div className="text-start">
                      <h5 className="mb-0">Rahul Kumar</h5>
                      <small className="text-muted">Property Owner</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm testimonial-card">
                <Card.Body className="text-center">
                  <Card.Text className="mb-4 font-italic">
                    "The token rewards are great! I've already saved over ₹15,000 on bookings from my review rewards."
                  </Card.Text>
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                      PA
                    </div>
                    <div className="text-start">
                      <h5 className="mb-0">Priya Agarwal</h5>
                      <small className="text-muted">Frequent Traveler</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action - Updated with Connect Wallet button */}
      <section className="cta-section py-5 text-white text-center">
        <Container>
          <h2 className="display-5 mb-4">Ready to experience authentic travel?</h2>
          <p className="lead mb-4">Join TourProof today and discover a new way to travel with confidence.</p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/auth" className="connect-wallet-btn">Connect Wallet →</Link>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;