import React, { useState } from 'react';
import { useBlockchain } from '../../hooks/useBlockchain';

const ReviewForm = ({ booking, onSubmit, isSubmitting }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const { verifyReview } = useBlockchain();

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleRatingHover = (value) => {
    setHoverRating(value);
  };

  const handleRatingLeave = () => {
    setHoverRating(0);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 3) {
      setError('You can upload a maximum of 3 images');
      return;
    }
    
    // Preview images
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setImages(newImages);
    setError(null);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newImages[index].preview);
    
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const validateForm = () => {
    if (rating === 0) {
      setError('Please select a rating');
      return false;
    }
    
    if (content.trim().length < 10) {
      setError('Please provide a review with at least 10 characters');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // Prepare the review data
      const reviewData = {
        booking_id: booking.booking_id,
        listing_id: booking.listing_id,
        rating,
        content,
        images: images.map(img => img.file)
      };
      
      // Get blockchain verification for the review
      const verificationResult = await verifyReview(reviewData);
      
      // Submit the review with verification
      await onSubmit({
        ...reviewData,
        blockchain_hash: verificationResult.hash,
        verification_status: verificationResult.status
      });
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Write a Review</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Your Rating</h3>
          <div 
            className="flex"
            onMouseLeave={handleRatingLeave}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className="text-3xl focus:outline-none"
                onClick={() => handleRatingClick(value)}
                onMouseEnter={() => handleRatingHover(value)}
              >
                <span className={value <= (hoverRating || rating) ? 'text-yellow-500' : 'text-gray-300'}>
                  ★
                </span>
              </button>
            ))}
            
            <span className="ml-2 text-sm text-gray-600 self-center">
              {rating > 0 ? `${rating} of 5 stars` : 'Select a rating'}
            </span>
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="review-content" className="block text-lg font-medium mb-2">
            Your Review
          </label>
          <textarea
            id="review-content"
            value={content}
            onChange={handleContentChange}
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share your experience with this listing..."
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Minimum 10 characters. Authentic reviews help others find great experiences.
          </p>
        </div>
        
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">
            Add Photos (Optional)
          </label>
          
          <div className="flex flex-wrap gap-4 mt-2">
            {images.map((image, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={image.preview}
                  alt={`Review ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
            
            {images.length < 3 && (
              <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:border-blue-500">
                <span className="text-gray-500">+</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  multiple={true}
                  max={3}
                />
              </label>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Upload up to 3 photos (Max 5MB each)
          </p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-md mb-6">
          <div className="flex items-start">
            <div className="mr-3 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-blue-700">Blockchain Verification</h4>
              <p className="text-sm text-blue-600 mt-1">
                Your review will be permanently stored on the blockchain, making it tamper-proof and verifiable. You'll earn tokens for submitting a verified review.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;