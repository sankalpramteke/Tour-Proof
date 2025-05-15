import apiClient from './api';

export const listingsService = {
  getAllListings: async (params) => {
    return await apiClient.get('/listings', { params });
  },
  
  getListingById: async (id) => {
    return await apiClient.get(`/listings/${id}`);
  },
  
  getListingReviews: async (id, params) => {
    return await apiClient.get(`/listings/${id}/reviews`, { params });
  },
  
  checkAvailability: async (id, startDate, endDate) => {
    return await apiClient.get(`/listings/${id}/availability`, {
      params: { startDate, endDate }
    });
  },
  
  getPopularListings: async () => {
    return await apiClient.get('/listings/popular');
  },
  
  getRecommendedListings: async (id) => {
    return await apiClient.get(`/listings/${id}/recommended`);
  },
  
  searchListings: async (searchQuery) => {
    return await apiClient.get('/listings/search', { params: searchQuery });
  }
};