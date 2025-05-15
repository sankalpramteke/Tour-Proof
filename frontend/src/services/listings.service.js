// Mock data for listings
const mockListings = [
  {
    id: 1,
    title: 'Luxury Beach Resort',
    location: 'Maldives',
    description: 'Experience paradise in our luxury beach resort',
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'],
    priceRange: { min: 200, max: 500 },
    averageRating: 4.8,
    reviewCount: 24,
    amenities: ['Pool', 'Spa', 'Beach Access', 'Restaurant']
  },
  {
    id: 2,
    title: 'Mountain Retreat',
    location: 'Swiss Alps',
    description: 'Cozy mountain cabin with breathtaking views',
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'],
    priceRange: { min: 150, max: 300 },
    averageRating: 4.6,
    reviewCount: 18,
    amenities: ['Fireplace', 'Hiking Trails', 'Scenic Views']
  },
  {
    id: 3,
    title: 'City Center Apartment',
    location: 'Paris, France',
    description: 'Modern apartment in the heart of Paris',
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'],
    priceRange: { min: 120, max: 250 },
    averageRating: 4.5,
    reviewCount: 32,
    amenities: ['WiFi', 'Kitchen', 'City Views']
  },
  {
    id: 4,
    title: 'Historic Villa',
    location: 'Tuscany, Italy',
    description: 'Beautiful villa surrounded by vineyards',
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'],
    priceRange: { min: 300, max: 600 },
    averageRating: 4.9,
    reviewCount: 15,
    amenities: ['Pool', 'Garden', 'Wine Cellar']
  }
];

export const listingsService = {
  getAllListings: async (params) => {
    return Promise.resolve({ data: mockListings });
  },
  
  getListingById: async (id) => {
    const listing = mockListings.find(l => l.id === parseInt(id));
    if (!listing) throw new Error('Listing not found');
    return Promise.resolve({ data: listing });
  },
  
  getListingReviews: async (id, params) => {
    return Promise.resolve({ data: [] });
  },
  
  checkAvailability: async (id, startDate, endDate) => {
    return Promise.resolve({ data: { available: true } });
  },
  
  getPopularListings: async () => {
    return Promise.resolve({ data: mockListings });
  },
  
  getRecommendedListings: async (id) => {
    return Promise.resolve({ data: mockListings.filter(l => l.id !== parseInt(id)).slice(0, 2) });
  },
  
  searchListings: async (searchQuery) => {
    const filtered = mockListings.filter(l => 
      l.title.toLowerCase().includes((searchQuery?.query || '').toLowerCase()) ||
      l.location.toLowerCase().includes((searchQuery?.query || '').toLowerCase())
    );
    return Promise.resolve({ data: filtered });
  }
};