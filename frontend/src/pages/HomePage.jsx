import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listingsService } from '../services/listings.service';

const HomePage = () => {
  const [popularListings, setPopularListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularListings = async () => {
      try {
        const data = await listingsService.getPopularListings();
        setPopularListings(data?.slice(0, 4) || []); // Show only 4 listings
      } catch (error) {
        console.error('Error fetching popular listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularListings();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Authentic reviews. Verified journeys.</h1>
          <p>Experience travel with confidence through blockchain-verified reviews and seamless bookings</p>
          <div className="hero-buttons">
            <Link to="/listings" className="btn btn-primary">Explore Destinations</Link>
            <Link to="/about" className="btn btn-secondary">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose TourProof</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Blockchain Verified</h3>
            <p>Every review is confirmed through blockchain technology, ensuring authenticity</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Earn Rewards</h3>
            <p>Get tokens for verified reviews that you can use for discounts on future bookings</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Trusted Community</h3>
            <p>Join thousands of travelers sharing real experiences</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💯</div>
            <h3>Direct Booking</h3>
            <p>Book directly through our platform with confidence</p>
          </div>
        </div>
      </section>

      {/* Popular Listings Section */}
      <section className="popular-listings-section">
        <h2>Popular Destinations</h2>
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <div className="listings-grid">
            {popularListings.length > 0 ? (
              popularListings.map((listing) => (
                <div key={listing.id} className="listing-card">
                  <div className="listing-image">
                    <img src={listing.images?.[0] || '/placeholder-image.jpg'} alt={listing.title} />
                    <div className="verified-badge">✓ Verified</div>
                  </div>
                  <div className="listing-content">
                    <h3>{listing.title}</h3>
                    <p className="listing-location">{listing.location}</p>
                    <div className="listing-rating">
                      ★ {listing.averageRating?.toFixed(1) || 'New'} 
                      {listing.reviewCount ? ` (${listing.reviewCount} reviews)` : ''}
                    </div>
                    <p className="listing-price">${listing.priceRange?.min} - ${listing.priceRange?.max} / night</p>
                    <Link to={`/listings/${listing.id}`} className="btn btn-outline">View Details</Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No listings available at the moment.</p>
            )}
          </div>
        )}
        <div className="view-all-container">
          <Link to="/listings" className="btn btn-secondary">View All Destinations</Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2>How TourProof Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Browse & Book</h3>
            <p>Find your perfect destination from our verified listings and book securely</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Enjoy Your Stay</h3>
            <p>Experience your journey with confidence in the authenticity of reviews</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Share & Earn</h3>
            <p>Leave your own verified review and earn tokens for future discounts</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"TourProof changed how I travel. Knowing reviews are verified gives me peace of mind when booking."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">JD</div>
              <div className="author-info">
                <h4>Jane Doe</h4>
                <p>Verified Traveler</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"As a hotel owner, I love that only actual guests can leave reviews. It's finally a fair system!"</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">JS</div>
              <div className="author-info">
                <h4>John Smith</h4>
                <p>Property Owner</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"The token rewards are great! I've already saved over $200 on bookings from my review rewards."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">AK</div>
              <div className="author-info">
                <h4>Alex Kim</h4>
                <p>Frequent Traveler</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to experience authentic travel?</h2>
          <p>Join TourProof today and discover a new way to travel with confidence.</p>
          <Link to="/auth" className="btn btn-primary">Sign Up Now</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;