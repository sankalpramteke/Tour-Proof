// API Endpoints
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Authentication
export const AUTH_TOKEN_KEY = 'tourproof_auth_token';
export const USER_DATA_KEY = 'tourproof_user_data';
export const TOKEN_EXPIRY_KEY = 'tourproof_token_expiry';

// Blockchain
export const BLOCKCHAIN_NETWORK_ID = import.meta.env.VITE_BLOCKCHAIN_NETWORK_ID || '1'; // Ethereum Mainnet
export const REVIEW_CONTRACT_ADDRESS = import.meta.env.VITE_REVIEW_CONTRACT_ADDRESS || '0x1234567890123456789012345678901234567890';
export const TOKEN_CONTRACT_ADDRESS = import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS || '0x0987654321098765432109876543210987654321';
export const BOOKING_CONTRACT_ADDRESS = import.meta.env.VITE_BOOKING_CONTRACT_ADDRESS || '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd';

// Pagination
export const ITEMS_PER_PAGE = 10;

// Review Ratings
export const RATING_OPTIONS = [
  { value: 1, label: 'Poor' },
  { value: 2, label: 'Fair' },
  { value: 3, label: 'Good' },
  { value: 4, label: 'Very Good' },
  { value: 5, label: 'Excellent' },
];

// Listing Categories
export const LISTING_CATEGORIES = [
  { value: 'hotel', label: 'Hotels & Accommodations' },
  { value: 'restaurant', label: 'Restaurants & Dining' },
  { value: 'attraction', label: 'Attractions & Activities' },
  { value: 'tour', label: 'Tours & Experiences' },
  { value: 'transportation', label: 'Transportation Services' },
];

// Price Ranges
export const PRICE_RANGES = [
  { value: 'budget', label: 'Budget', minPrice: 0, maxPrice: 50 },
  { value: 'moderate', label: 'Moderate', minPrice: 51, maxPrice: 150 },
  { value: 'luxury', label: 'Luxury', minPrice: 151, maxPrice: 500 },
  { value: 'premium', label: 'Premium', minPrice: 501, maxPrice: null },
];

// Sort Options
export const SORT_OPTIONS = [
  { value: 'rating_desc', label: 'Highest Rating' },
  { value: 'rating_asc', label: 'Lowest Rating' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'reviews', label: 'Most Reviews' },
  { value: 'newest', label: 'Newest First' },
];

// Booking Status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELED: 'canceled',
};

// Review Status
export const REVIEW_STATUS = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
};

// Token Transaction Types
export const TOKEN_TRANSACTION_TYPES = {
  REVIEW_REWARD: 'review_reward',
  BOOKING_DISCOUNT: 'booking_discount',
  REFERRAL_BONUS: 'referral_bonus',
  MANUAL_ADJUSTMENT: 'manual_adjustment',
};

// Error Messages
export const ERROR_MESSAGES = {
  DEFAULT: 'Something went wrong. Please try again later.',
  NETWORK: 'Network error. Please check your internet connection.',
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your inputs and try again.',
  WALLET_CONNECTION: 'Failed to connect wallet. Please make sure MetaMask is installed and unlocked.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful. Welcome back!',
  SIGNUP: 'Account created successfully. Welcome to TourProof!',
  PROFILE_UPDATE: 'Profile updated successfully.',
  BOOKING_CREATED: 'Booking confirmed successfully.',
  REVIEW_SUBMITTED: 'Review submitted successfully. Verification in progress.',
  WALLET_CONNECTED: 'Wallet connected successfully.',
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth?action=login',
  SIGNUP: '/auth?action=signup',
  LISTINGS: '/listings',
  LISTING_DETAIL: '/listings/:id',
  BOOKING: '/booking/:listingId',
  DASHBOARD: '/dashboard',
  PROFILE: '/dashboard/profile',
  USER_BOOKINGS: '/dashboard/bookings',
  USER_REVIEWS: '/dashboard/reviews',
  REVIEW: '/review/:bookingId',
  ABOUT: '/about',
};

// Date Format
export const DATE_FORMAT = 'YYYY-MM-DD';

// Maximum Upload Sizes (in bytes)
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_IMAGES_COUNT = 5;

// Token Rewards
export const TOKEN_REWARDS = {
  BASE_REVIEW: 10,
  DETAILED_REVIEW: 5, // Additional for long reviews
  WITH_PHOTOS: 5, // Additional for reviews with photos
};

// localStorage Keys
export const STORAGE_KEYS = {
  RECENT_SEARCHES: 'tourproof_recent_searches',
  FAVORITE_LISTINGS: 'tourproof_favorite_listings',
  THEME_PREFERENCE: 'tourproof_theme_preference',
};

export default {
  API_BASE_URL,
  AUTH_TOKEN_KEY,
  USER_DATA_KEY,
  TOKEN_EXPIRY_KEY,
  BLOCKCHAIN_NETWORK_ID,
  REVIEW_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
  BOOKING_CONTRACT_ADDRESS,
  ITEMS_PER_PAGE,
  RATING_OPTIONS,
  LISTING_CATEGORIES,
  PRICE_RANGES,
  SORT_OPTIONS,
  BOOKING_STATUS,
  REVIEW_STATUS,
  TOKEN_TRANSACTION_TYPES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  ROUTES,
  DATE_FORMAT,
  MAX_IMAGE_SIZE,
  MAX_IMAGES_COUNT,
  TOKEN_REWARDS,
  STORAGE_KEYS,
};