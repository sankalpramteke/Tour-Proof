import { ethers } from 'ethers';

// Import ABI files
import ReviewVerificationABI from '../assets/contracts/ReviewVerification.json';
import TokenRewardABI from '../assets/contracts/TokenReward.json';
import BookingReceiptABI from '../assets/contracts/BookingReceipt.json';

// Contract addresses - these would come from environment variables in a real app
const CONTRACT_ADDRESSES = {
  reviewVerification: import.meta.env.VITE_REVIEW_VERIFICATION_CONTRACT || '',
  tokenReward: import.meta.env.VITE_TOKEN_REWARD_CONTRACT || '',
  bookingReceipt: import.meta.env.VITE_BOOKING_RECEIPT_CONTRACT || ''
};

class BlockchainService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.contracts = {
      reviewVerification: null,
      tokenReward: null,
      bookingReceipt: null
    };
  }

  // Initialize the service with a provider and signer
  initialize(provider, signer) {
    this.provider = provider;
    this.signer = signer;
    
    // Initialize contracts
    if (CONTRACT_ADDRESSES.reviewVerification) {
      this.contracts.reviewVerification = new ethers.Contract(
        CONTRACT_ADDRESSES.reviewVerification,
        ReviewVerificationABI.abi,
        this.signer
      );
    }
    
    if (CONTRACT_ADDRESSES.tokenReward) {
      this.contracts.tokenReward = new ethers.Contract(
        CONTRACT_ADDRESSES.tokenReward,
        TokenRewardABI.abi,
        this.signer
      );
    }
    
    if (CONTRACT_ADDRESSES.bookingReceipt) {
      this.contracts.bookingReceipt = new ethers.Contract(
        CONTRACT_ADDRESSES.bookingReceipt,
        BookingReceiptABI.abi,
        this.signer
      );
    }
  }

  // Check if service is initialized
  isInitialized() {
    return !!(this.provider && this.signer);
  }

  // Verify a review on the blockchain
  async verifyReview(reviewId, bookingId, reviewHash) {
    if (!this.isInitialized() || !this.contracts.reviewVerification) {
      throw new Error('Blockchain service not properly initialized');
    }
    
    try {
      const tx = await this.contracts.reviewVerification.storeReviewHash(
        reviewId,
        bookingId,
        reviewHash
      );
      
      return await tx.wait();
    } catch (error) {
      console.error('Error verifying review on blockchain:', error);
      throw new Error('Failed to verify review on blockchain');
    }
  }

  // Check verification status of a review
  async checkReviewVerification(reviewId) {
    if (!this.isInitialized() || !this.contracts.reviewVerification) {
      throw new Error('Blockchain service not properly initialized');
    }
    
    try {
      return await this.contracts.reviewVerification.verifyReview(reviewId);
    } catch (error) {
      console.error('Error checking review verification:', error);
      throw new Error('Failed to check review verification');
    }
  }

  // Create booking receipt on blockchain
  async createBookingReceipt(bookingId, userId, listingId, bookingDetails) {
    if (!this.isInitialized() || !this.contracts.bookingReceipt) {
      throw new Error('Blockchain service not properly initialized');
    }
    
    try {
      const bookingDetailsHash = ethers.utils.keccak256(
        ethers.utils.toUtf8Bytes(JSON.stringify(bookingDetails))
      );
      
      const tx = await this.contracts.bookingReceipt.createReceipt(
        bookingId,
        userId,
        listingId,
        bookingDetailsHash
      );
      
      return await tx.wait();
    } catch (error) {
      console.error('Error creating booking receipt:', error);
      throw new Error('Failed to create booking receipt on blockchain');
    }
  }

  // Get token balance
  async getTokenBalance(address) {
    if (!this.isInitialized() || !this.contracts.tokenReward) {
      throw new Error('Blockchain service not properly initialized');
    }
    
    try {
      const balance = await this.contracts.tokenReward.balanceOf(address);
      return ethers.utils.formatUnits(balance, 18); // Assuming 18 decimals for the token
    } catch (error) {
      console.error('Error getting token balance:', error);
      throw new Error('Failed to get token balance');
    }
  }

  // Award tokens for a review
  async awardTokens(userAddress, reviewId, amount) {
    if (!this.isInitialized() || !this.contracts.tokenReward) {
      throw new Error('Blockchain service not properly initialized');
    }
    
    try {
      const tx = await this.contracts.tokenReward.awardTokens(
        userAddress,
        reviewId,
        ethers.utils.parseUnits(amount.toString(), 18) // Convert to wei units
      );
      
      return await tx.wait();
    } catch (error) {
      console.error('Error awarding tokens:', error);
      throw new Error('Failed to award tokens');
    }
  }
}

// Create and export a singleton instance
export const blockchainService = new BlockchainService();