import React, { useState, useEffect } from 'react';
import { useWallet } from '../../hooks/useWallet';

const PaymentForm = ({ totalPrice, onPaymentComplete, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { walletAddress, walletBalance, connectWallet } = useWallet();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      // Only allow numbers and format with spaces
      const formatted = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
      setCardDetails(prev => ({ ...prev, cardNumber: formatted }));
      return;
    }
    
    if (name === 'expiryDate') {
      // Format as MM/YY
      const expiry = value.replace(/\D/g, '');
      if (expiry.length <= 2) {
        setCardDetails(prev => ({ ...prev, expiryDate: expiry }));
      } else {
        setCardDetails(prev => ({ 
          ...prev, 
          expiryDate: `${expiry.slice(0, 2)}/${expiry.slice(2, 4)}` 
        }));
      }
      return;
    }
    
    if (name === 'cvv') {
      // Only allow numbers with max length 3-4
      const cvv = value.replace(/\D/g, '').slice(0, 4);
      setCardDetails(prev => ({ ...prev, cvv }));
      return;
    }
    
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const validateCardDetails = () => {
    if (cardDetails.cardNumber.replace(/\s/g, '').length < 16) {
      return 'Please enter a valid card number';
    }
    if (!cardDetails.cardHolder.trim()) {
      return 'Please enter the cardholder name';
    }
    if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
      return 'Please enter a valid expiry date (MM/YY)';
    }
    if (cardDetails.cvv.length < 3) {
      return 'Please enter a valid CVV code';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (paymentMethod === 'credit-card') {
      const validationError = validateCardDetails();
      if (validationError) {
        setError(validationError);
        return;
      }
    } else if (paymentMethod === 'crypto' && !walletAddress) {
      setError('Please connect your wallet to complete the payment');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, you would call your payment processing API here
      const paymentDetails = {
        method: paymentMethod,
        amount: totalPrice,
        walletAddress: paymentMethod === 'crypto' ? walletAddress : null,
        timestamp: new Date().toISOString()
      };
      
      onPaymentComplete(paymentDetails);
    } catch (err) {
      console.error('Payment error:', err);
      setError('Payment processing failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Payment Details</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">Select Payment Method</h3>
        <div className="flex gap-4">
          <button
            type="button"
            className={`flex items-center px-4 py-3 border rounded-md ${
              paymentMethod === 'credit-card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onClick={() => setPaymentMethod('credit-card')}
          >
            <span className="mr-2">💳</span>
            Credit Card
          </button>
          <button
            type="button"
            className={`flex items-center px-4 py-3 border rounded-md ${
              paymentMethod === 'crypto' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onClick={() => setPaymentMethod('crypto')}
          >
            <span className="mr-2">🔗</span>
            Cryptocurrency
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {paymentMethod === 'credit-card' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength="19"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                name="cardHolder"
                value={cardDetails.cardHolder}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength="5"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength="4"
                  required
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Pay with Cryptocurrency</h4>
              
              {walletAddress ? (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Connected Wallet:</p>
                  <p className="font-mono text-sm break-all bg-white p-2 rounded border border-gray-300">
                    {walletAddress}
                  </p>
                  {walletBalance !== null && (
                    <p className="mt-2 text-sm text-gray-600">
                      Balance: <span className="font-medium">{walletBalance} ETH</span>
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-600 mb-3">
                    Connect your wallet to pay with cryptocurrency
                  </p>
                  <button
                    type="button"
                    onClick={connectWallet}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Connect Wallet
                  </button>
                </div>
              )}
              
              {walletAddress && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-1">Amount to pay:</p>
                  <p className="font-medium">{totalPrice} USD (≈ {(totalPrice * 0.00025).toFixed(4)} ETH)</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back
          </button>
          
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            disabled={isLoading || (paymentMethod === 'crypto' && !walletAddress)}
          >
            {isLoading ? 'Processing...' : `Pay ${totalPrice} USD`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;