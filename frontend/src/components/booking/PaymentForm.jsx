import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
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
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <h3 className="mb-4">Payment Details</h3>

        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label>Select Payment Method</Form.Label>
            <div className="d-flex gap-3">
              <Button
                variant={paymentMethod === 'credit-card' ? 'primary' : 'outline-primary'}
                onClick={() => setPaymentMethod('credit-card')}
                className="d-flex align-items-center"
                type="button"
              >
                <i className="bi bi-credit-card me-2"></i>
                Credit Card
              </Button>
              <Button
                variant={paymentMethod === 'crypto' ? 'primary' : 'outline-primary'}
                onClick={() => setPaymentMethod('crypto')}
                className="d-flex align-items-center"
                type="button"
              >
                <i className="bi bi-lock me-2"></i>
                Cryptocurrency
              </Button>
            </div>
          </Form.Group>

          {paymentMethod === 'credit-card' ? (
            <div className="mb-4">
              <Form.Group className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  name="cardNumber"
                  value={cardDetails.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Cardholder Name</Form.Label>
                <Form.Control
                  type="text"
                  name="cardHolder"
                  value={cardDetails.cardHolder}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control
                      type="text"
                      name="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control
                      type="text"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength="4"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          ) : (
            <Card className="bg-light mb-4">
              <Card.Body>
                <h5 className="mb-3">Pay with Cryptocurrency</h5>

                {walletAddress ? (
                  <div>
                    <p className="text-muted mb-2">Connected Wallet:</p>
                    <Card className="mb-3">
                      <Card.Body className="p-2">
                        <code className="text-break">{walletAddress}</code>
                      </Card.Body>
                    </Card>
                    {walletBalance !== null && (
                      <p className="text-muted mb-0">
                        Balance: <strong>{walletBalance} ETH</strong>
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-3">
                    <p className="text-muted mb-3">
                      Connect your wallet to pay with cryptocurrency
                    </p>
                    <Button
                      variant="primary"
                      onClick={connectWallet}
                      type="button"
                    >
                      Connect Wallet
                    </Button>
                  </div>
                )}

                {walletAddress && (
                  <div className="mt-3">
                    <p className="text-muted mb-1">Amount to pay:</p>
                    <p className="h5 mb-0">
                      {totalPrice} USD (≈ {(totalPrice * 0.00025).toFixed(4)} ETH)
                    </p>
                  </div>
                )}
              </Card.Body>
            </Card>
          )}

          <div className="d-flex justify-content-between">
            <Button
              variant="outline-secondary"
              onClick={onBack}
              type="button"
            >
              Back
            </Button>

            <Button
              variant="primary"
              type="submit"
              disabled={isLoading || (paymentMethod === 'crypto' && !walletAddress)}
            >
              {isLoading ? 'Processing...' : `Pay ${totalPrice} USD`}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PaymentForm;