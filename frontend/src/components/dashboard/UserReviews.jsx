import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        <span key={i} className={`text-lg ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}>
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
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">My Reviews</h2>
      </div>

      {reviews.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">You haven't written any reviews yet.</p>
          <div className="mt-4">
            <Link 
              to="/listings" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Explore listings
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review.review_id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <Link 
                    to={`/listings/${review.listing_id}`}
                    className="font-bold text-lg hover:text-blue-600"
                  >
                    {review.listing?.title || 'Listing'}
                  </Link>
                  <div className="flex items-center mt-1">
                    <div className="flex mr-2">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-gray-500 text-sm">
                      {formatDate(review.created_at)}
                    </span>
                    {review.verification_status === 'verified' && (
                      <span className="ml-2">
                        <VerifiedBadge />
                      </span>
                    )}
                  </div>
                </div>
                
                {review.blockchain_hash && (
                  <button 
                    onClick={() => window.open(`https://etherscan.io/tx/${review.blockchain_hash}`, '_blank')}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View on blockchain
                  </button>
                )}
              </div>
              
              <div className="mt-3">
                <p className="text-gray-700">{review.content}</p>
              </div>

              {review.images && review.images.length > 0 && (
                <div className="mt-4 flex space-x-2 overflow-x-auto">
                  {review.images.map((image, index) => (
                    <img 
                      key={index} 
                      src={image} 
                      alt={`Review ${index + 1}`} 
                      className="h-20 w-20 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}

              {review.verification_status === 'verified' && (
                <div className="mt-3 text-sm text-green-600">
                  ✓ This review was verified and earned you tokens
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserReviews;