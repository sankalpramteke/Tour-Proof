import { useState, useEffect } from 'react';
import { useWallet } from './useWallet';
import { blockchainService } from '../services/blockchain.service';

export const useBlockchain = () => {
  const { wallet } = useWallet();
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    if (wallet.connected && wallet.provider && wallet.signer) {
      blockchainService.initialize(wallet.provider, wallet.signer);
      setInitialized(true);
    } else {
      setInitialized(false);
    }
  }, [wallet.connected, wallet.provider, wallet.signer]);
  
  const verifyReview = async (reviewId, bookingId, reviewHash) => {
    if (!initialized) {
      throw new Error('Blockchain service not initialized. Connect wallet first.');
    }
    
    return await blockchainService.verifyReview(reviewId, bookingId, reviewHash);
  };
  
  const checkReviewVerification = async (reviewId) => {
    if (!initialized) {
      throw new Error('Blockchain service not initialized. Connect wallet first.');
    }
    
    return await blockchainService.checkReviewVerification(reviewId);
  };
  
  const createBookingReceipt = async (bookingId, userId, listingId, bookingDetails) => {
    if (!initialized) {
      throw new Error('Blockchain service not initialized. Connect wallet first.');
    }
    
    return await blockchainService.createBookingReceipt(bookingId, userId, listingId, bookingDetails);
  };
  
  const getTokenBalance = async (address) => {
    if (!initialized) {
      throw new Error('Blockchain service not initialized. Connect wallet first.');
    }
    
    return await blockchainService.getTokenBalance(address || wallet.address);
  };
  
  const awardTokens = async (userAddress, reviewId, amount) => {
    if (!initialized) {
      throw new Error('Blockchain service not initialized. Connect wallet first.');
    }
    
    return await blockchainService.awardTokens(userAddress, reviewId, amount);
  };
  
  return {
    initialized,
    verifyReview,
    checkReviewVerification,
    createBookingReceipt,
    getTokenBalance,
    awardTokens
  };
};