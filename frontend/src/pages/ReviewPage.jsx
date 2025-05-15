import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReviewForm from '../components/reviews/ReviewForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { bookingsService } from '../services/bookings.service';
import { reviewsService } from '../services/reviews.service';
import { useAuth } from '../hooks/useAuth';

const ReviewPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth', { state: { redirectTo: `/review/${bookingId}` } });
      return;
    }
    
    const fetchBooking = async () => {
      setIsLoading(true);
      try {
        const data = await bookingsService.getBooking(bookingId);
        
        // Check if the booking belongs to the current user
        if (data.user_id !== user?.id) {
          setError('You are not authorized to review this booking');
          return;
        }
        
        // Check if booking is completed or past checkout date
        const now = new Date();
        const endDate = new Date(data.end_date);
        const isEligibleForReview = data.status === 'completed' || 
          (data.status === 'confirmed' && endDate < now);
        
        if (!isEligibleForReview) {
          setError('This booking is not eligible for review yet');
          return;
        }
        
        // Check if booking already has a review
        const hasReview = await reviewsService.checkReviewExists(bookingId);
        if (hasReview) {
          setError('You have already submitted a review for this booking');
          return;
        }
        
        setBooking(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching booking:', err);
        setError('Failed to load booking information');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (isAuthenticated && user && bookingId) {
      fetchBooking();
    }
  }, [bookingId, user, isAuthenticated, authLoading, navigate]);
  
  const handleSubmitReview = async (reviewData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await reviewsService.submitReview({
        ...reviewData,
        user_id: user.id
      });
      
      setSuccessMessage('Your review has been submitted successfully!');
      
      // Redirect to dashboard after a brief delay
      setTimeout(() => {
        navigate('/dashboard', { state: { tab: 'reviews' } });
      }, 3000);
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (authLoading || isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <LoadingSpinner />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {error ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="p-4 bg-red-50 text-red-700 rounded-md">
            <p>{error}</p>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      ) : successMessage ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-md">
            <p>{successMessage}</p>
          </div>
          <p className="mb-4">Redirecting to your dashboard...</p>
          <LoadingSpinner />
        </div>
      ) : booking ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6 pb-6 border-b">
            <h1 className="text-2xl font-bold">Review Your Stay</h1>
            <div className="mt-3">
              <p className="font-medium">{booking.listing?.title || 'Listing'}</p>
              <p className="text-gray-600">
                {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <ReviewForm
            booking={booking}
            onSubmit={handleSubmitReview}
            isSubmitting={isSubmitting}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ReviewPage;