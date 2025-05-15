import apiClient from './api';

export const reviewsService = {
  submitReview: async (reviewData) => {
    return await apiClient.post('/reviews', reviewData);
  },
  
  getReviewById: async (id) => {
    return await apiClient.get(`/reviews/${id}`);
  },
  
  getUserReviews: async () => {
    return await apiClient.get('/user/reviews');
  },
  
  verifyReview: async (reviewId) => {
    return await apiClient.get(`/reviews/${reviewId}/verify`);
  },
  
  updateReview: async (id, reviewData) => {
    return await apiClient.put(`/reviews/${id}`, reviewData);
  },
  
  deleteReview: async (id) => {
    return await apiClient.delete(`/reviews/${id}`);
  },
  
  getVerificationStatus: async (id) => {
    return await apiClient.get(`/reviews/${id}/verification-status`);
  }
};