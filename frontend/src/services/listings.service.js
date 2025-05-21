// Mock data for listings
const mockListings = [
  {
    id: 'sample-1',
    title: 'Seaside Villa Retreat',
    location: 'Goa, India',
    images: ['https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&auto=format&fit=crop&q=60'],
    averageRating: 4.7,
    reviewCount: 42,
    priceRange: { min: 250, max: 500 },
    description: 'Luxurious beachfront villa with private pool and stunning ocean views',
    amenities: ['Pool', 'Spa', 'Beach Access', 'Restaurant']
  },
  {
    id: 'sample-2',
    title: 'Himalayan Mountain Lodge',
    location: 'Himachal Pradesh, India',
    images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=60'],
    averageRating: 4.8,
    reviewCount: 35,
    priceRange: { min: 180, max: 350 },
    description: 'Cozy mountain retreat with panoramic views of the Himalayas',
    amenities: ['Fireplace', 'Hiking Trails', 'Mountain Views', 'Restaurant']
  },
  {
    id: 'sample-3',
    title: 'Urban Luxury Apartment',
    location: 'Mumbai, India',
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=60'],
    averageRating: 4.6,
    reviewCount: 52,
    priceRange: { min: 200, max: 400 },
    description: 'Modern apartment in the heart of Mumbai with city skyline views',
    amenities: ['WiFi', 'Gym', 'City Views', 'Concierge']
  },
  {
    id: 'sample-4',
    title: 'Beachfront Paradise Resort',
    location: 'Kerala, India',
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=60'],
    averageRating: 4.9,
    reviewCount: 28,
    priceRange: { min: 300, max: 600 },
    description: 'Traditional Kerala-style resort with private beach access',
    amenities: ['Pool', 'Spa', 'Beach Access', 'Ayurveda Center']
  },
  {
    id: 'sample-5',
    title: 'Royal Heritage Haveli',
    location: 'Rajasthan, India',
    images: ['https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=800&auto=format&fit=crop&q=60'],
    averageRating: 4.8,
    reviewCount: 45,
    priceRange: { min: 280, max: 550 },
    description: 'Historic palace turned luxury hotel with traditional Rajasthani architecture',
    amenities: ['Heritage Tours', 'Restaurant', 'Garden', 'Cultural Activities']
  },
  {
    id: 'sample-6',
    title: 'Peaceful Lakeside Cottage',
    location: 'Uttarakhand, India',
    images: ['https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800&auto=format&fit=crop&q=60'],
    averageRating: 4.7,
    reviewCount: 31,
    priceRange: { min: 150, max: 300 },
    description: 'Serene cottage overlooking a pristine mountain lake',
    amenities: ['Lake View', 'Garden', 'Bonfire', 'Nature Trails']
  }
];

export const listingsService = {
  getAllListings: async (params) => {
    return Promise.resolve({ data: mockListings });
  },
  
  getListingById: async (id) => {
    const listing = mockListings.find(l => l.id === id);
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
    return Promise.resolve({ data: mockListings.filter(l => l.id !== id).slice(0, 2) });
  },
  
  searchListings: async (searchQuery) => {
    const filtered = mockListings.filter(l => 
      l.title.toLowerCase().includes((searchQuery?.query || '').toLowerCase()) ||
      l.location.toLowerCase().includes((searchQuery?.query || '').toLowerCase())
    );
    return Promise.resolve({ data: filtered });
  }
};