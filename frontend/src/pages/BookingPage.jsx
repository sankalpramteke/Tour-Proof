import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import BookingForm from "../components/booking/BookingForm";
import PaymentForm from "../components/booking/PaymentForm";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { listingsService } from "../services/listings.service";
import { bookingsService } from "../services/bookings.service";
import { useAuth } from "../hooks/useAuth";

const BookingPage = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    startDate: null,
    endDate: null,
    guests: 1,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!currentUser) {
      navigate("/auth?redirect=/booking/" + listingId);
      return;
    }
    
    const fetchListingData = async () => {
      try {
        setLoading(true);
        const { data } = await listingsService.getListingById(listingId);
        setListing(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching listing:", err);
        setError("Failed to load listing details. Please try again.");
        setLoading(false);
      }
    };
    
    fetchListingData();
  }, [listingId, currentUser, navigate]);
  
  // Calculate number of nights and total price
  useEffect(() => {
    if (listing && bookingDetails.startDate && bookingDetails.endDate) {
      const startDate = new Date(bookingDetails.startDate);
      const endDate = new Date(bookingDetails.endDate);
      
      // Calculate number of nights
      const timeDiff = endDate.getTime() - startDate.getTime();
      const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      // Calculate total price
      const basePrice = listing.price * nights;
      const serviceFee = basePrice * 0.10; // 10% service fee
      const totalPrice = basePrice + serviceFee;
      
      setTotalPrice(totalPrice);
    }
  }, [listing, bookingDetails]);
  
  const handleBookingDetailsChange = (newDetails) => {
    setBookingDetails({
      ...bookingDetails,
      ...newDetails
    });
  };
  
  const handleNextStep = () => {
    setCurrentStep(2);
  };
  
  const handlePrevStep = () => {
    setCurrentStep(1);
  };
  
  const handleSubmitBooking = async (paymentDetails) => {
    try {
      setLoading(true);
      
      const bookingData = {
        listingId,
        userId: currentUser.id,
        startDate: bookingDetails.startDate,
        endDate: bookingDetails.endDate,
        guests: bookingDetails.guests,
        totalPrice,
        paymentMethod: paymentDetails.paymentMethod,
        // Add other payment details as needed
      };
      
      const { data: response } = await bookingsService.createBooking(bookingData);
      
      // Navigate to confirmation page
      navigate(`/dashboard?booking=${response.id}`);
      
    } catch (err) {
      console.error("Error creating booking:", err);
      setError("Failed to complete booking. Please try again.");
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <Container className="my-5 text-center">
        <LoadingSpinner />
      </Container>
    );
  }
  
  if (error || !listing) {
    return (
      <Container className="my-5">
        <div className="alert alert-danger">{error || "Listing not found"}</div>
        <Button variant="primary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }
  
  return (
    <Container className="my-5">
      <h1 className="mb-4">Book Your Stay</h1>
      
      <Row>
        <Col lg={7}>
          {currentStep === 1 ? (
            <BookingForm 
              listing={listing}
              bookingDetails={bookingDetails}
              onBookingDetailsChange={handleBookingDetailsChange}
              onNextStep={handleNextStep}
            />
          ) : (
            <PaymentForm 
              totalPrice={totalPrice}
              onPrevStep={handlePrevStep}
              onSubmitBooking={handleSubmitBooking}
            />
          )}
        </Col>
        
        <Col lg={5}>
          <Card className="shadow-sm sticky-top" style={{ top: "20px" }}>
            <Card.Header className="bg-white border-bottom-0">
              <div className="d-flex align-items-center">
                <img 
                  src={listing.images && listing.images.length > 0 ? listing.images[0] : "/assets/images/placeholder.jpg"}
                  alt={listing.title}
                  className="me-3 rounded"
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
                <div>
                  <h5 className="mb-0">{listing.title}</h5>
                  <small className="text-muted">{listing.location}</small>
                </div>
              </div>
            </Card.Header>
            
            <Card.Body>
              <h6 className="mb-3">Booking Summary</h6>
              
              {bookingDetails.startDate && bookingDetails.endDate ? (
                <div className="booking-details">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Dates</span>
                    <span>
                      {new Date(bookingDetails.startDate).toLocaleDateString()} - {new Date(bookingDetails.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>Guests</span>
                    <span>{bookingDetails.guests}</span>
                  </div>
                  
                  <hr />
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>${listing.price} × {Math.ceil((new Date(bookingDetails.endDate) - new Date(bookingDetails.startDate)) / (1000 * 3600 * 24))} nights</span>
                    <span>${listing.price * Math.ceil((new Date(bookingDetails.endDate) - new Date(bookingDetails.startDate)) / (1000 * 3600 * 24))}</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>Service fee</span>
                    <span>${(listing.price * Math.ceil((new Date(bookingDetails.endDate) - new Date(bookingDetails.startDate)) / (1000 * 3600 * 24)) * 0.10).toFixed(2)}</span>
                  </div>
                  
                  <hr />
                  
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <p className="text-muted">Select dates to see price details</p>
              )}
              
              <div className="mt-3">
                <i className="bi bi-shield-check me-2 text-success"></i>
                <small>Your booking will be secured with blockchain verification</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingPage;