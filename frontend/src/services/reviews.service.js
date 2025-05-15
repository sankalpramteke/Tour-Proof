// Mock data for reviews
const mockReviews = [
  {
    id: 1,
    listingId: 1,
    userId: 1,
    rating: 5,
    comment: 'Amazing place! The beach was beautiful and the service was exceptional.',
    date: '2024-05-01',
    verified: true,
    userName: 'John D.'
  },
  {
    id: 2,
    listingId: 1,
    userId: 2,
    rating: 4,
    comment: 'Great location and amenities. Would definitely come back.',
    date: '2024-04-15',
    verified: true,
    userName: 'Sarah M.'
  }
];

export const reviewsService = {
  submitReview: async (reviewData) => {
    const newReview = {
      id: mockReviews.length + 1,
      ...reviewData,
      date: new Date().toISOString().split('T')[0],
      verified: true,
      userName: 'Guest User'
    };
    mockReviews.push(newReview);
    return Promise.resolve({ data: newReview });
  },
  
  getReviewById: async (id) => {
    const review = mockReviews.find(r => r.id === parseInt(id));
    if (!review) throw new Error('Review not found');
    return Promise.resolve({ data: review });
  },
  
  getUserReviews: async () => {
    return Promise.resolve({ data: mockReviews.filter(r => r.userId === 1) });
  },
  
  verifyReview: async (reviewId) => {
    return Promise.resolve({ data: { verified: true } });
  },
  
  updateReview: async (id, reviewData) => {
    const index = mockReviews.findIndex(r => r.id === parseInt(id));
    if (index === -1) throw new Error('Review not found');
    mockReviews[index] = { ...mockReviews[index], ...reviewData };
    return Promise.resolve({ data: mockReviews[index] });
  },
  
  deleteReview: async (id) => {
    const index = mockReviews.findIndex(r => r.id === parseInt(id));
    if (index === -1) throw new Error('Review not found');
    mockReviews.splice(index, 1);
    return Promise.resolve({ data: { success: true } });
  },
  
  getVerificationStatus: async (id) => {
    return Promise.resolve({ data: { verified: true, blockchainTxId: '0x123...abc' } });
  },

  getReviewsByListingId: async (listingId) => {
    return Promise.resolve({ data: mockReviews.filter(r => r.listingId === parseInt(listingId)) });
  }
};