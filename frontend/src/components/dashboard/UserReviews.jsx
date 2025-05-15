import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Alert, Button, Badge, Row, Col } from 'react-bootstrap';
import { reviewsService } from '../../services/reviews.service';
import LoadingSpinner from '../common/LoadingSpinner';
import VerifiedBadge from '../reviews/VerifiedBadge';

const UserReviews = ({ userId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const data = await reviewsService.getUserReviews(userId);
        setReviews(data);
        setError(null);
      } catch (err) {
        setError('Failed to load reviews. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchReviews();
    }
  }, [userId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`fs-5 ${i <= rating ? 'text-warning' : 'text-muted'}`}>
          ★
        </span>
      );
    }
    return stars;
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

  return (
    <div>
      <div className="mb-4">
        <h3>My Reviews</h3>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">You haven't written any reviews yet.</p>
          <div className="mt-3">
            <Link 
              to="/listings" 
              className="btn btn-primary"
            >
              Explore listings
            </Link>
          </div>
        </div>
      ) : (
        <div className="d-grid gap-4">
          {reviews.map(review => (
            <Card key={review.review_id} className="shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <Link 
                      to={`/listings/${review.listing_id}`}
                      className="text-decoration-none"
                    >
                      <h5 className="mb-2">{review.listing?.title || 'Listing'}</h5>
                    </Link>
                    <div className="d-flex align-items-center gap-2">
                      <div className="d-flex">
                        {renderStars(review.rating)}
                      </div>
                      <small className="text-muted">
                        {formatDate(review.created_at)}
                      </small>
                      {review.verification_status === 'verified' && (
                        <span>
                          <VerifiedBadge />
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {review.blockchain_hash && (
                    <Button 
                      variant="link"
                      size="sm"
                      onClick={() => window.open(`https://etherscan.io/tx/${review.blockchain_hash}`, '_blank')}
                    >
                      View on blockchain
                    </Button>
                  )}
                </div>
                
                <p className="mt-3 text-muted">{review.content}</p>

                {review.images && review.images.length > 0 && (
                  <div className="mt-3 d-flex gap-2 overflow-auto">
                    {review.images.map((image, index) => (
                      <img 
                        key={index} 
                        src={image} 
                        alt={`Review ${index + 1}`} 
                        style={{ height: '80px', width: '80px', objectFit: 'cover' }}
                        className="rounded"
                      />
                    ))}
                  </div>
                )}

                {review.verification_status === 'verified' && (
                  <div className="mt-3 small text-success">
                    ✓ This review was verified and earned you tokens
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReviews;