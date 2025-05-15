import apiClient from './api';

export const bookingsService = {
  createBooking: async (bookingData) => {
    return await apiClient.post('/bookings', bookingData);
  },
  
  getBookingById: async (id) => {
    return await apiClient.get(`/bookings/${id}`);
  },
  
  getUserBookings: async (params) => {
    return await apiClient.get('/user/bookings', { params });
  },
  
  cancelBooking: async (id) => {
    return await apiClient.put(`/bookings/${id}/cancel`);
  },
  
  getBookingReceipt: async (id) => {
    return await apiClient.get(`/bookings/${id}/receipt`);
  },
  
  updateBooking: async (id, updateData) => {
    return await apiClient.put(`/bookings/${id}`, updateData);
  },
  
  getReviewEligibility: async (bookingId) => {
    return await apiClient.get(`/bookings/${bookingId}/review-eligibility`);
  }
};