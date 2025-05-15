import React, { useState } from "react";
import { Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import Calendar from "./Calendar";

const BookingForm = ({ listing, bookingDetails, onBookingDetailsChange, onNextStep }) => {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  
  const handleDateChange = (start, end) => {
    onBookingDetailsChange({
      startDate: start,
      endDate: end
    });
  };
  
  const handleGuestsChange = (e) => {
    const guests = parseInt(e.target.value);
    onBookingDetailsChange({ guests });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    // Validate dates
    if (!bookingDetails.startDate || !bookingDetails.endDate) {
      setError("Please select your check-in and check-out dates");
      return;
    }
    
    // Validate guests
    if (!bookingDetails.guests || bookingDetails.guests < 1) {
      setError("Please select the number of guests");
      return;
    }
    
    // All validations passed, proceed to next step
    onNextStep();
  };
  
  return (
    <Card className="shadow-sm mb-4">
      <Card.Body>
        <h3 className="mb-4">Your Trip Details</h3>
        
        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        )}
        
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label>Dates</Form.Label>
            <Calendar 
              listing={listing}
              startDate={bookingDetails.startDate}
              endDate={bookingDetails.endDate}
              onDateChange={handleDateChange}
            />
          </Form.Group>
          
          <Row className="mb-4">
            <Col>
              <Form.Group>
                <Form.Label>Guests</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max={listing.maxGuests || 10}
                  value={bookingDetails.guests}
                  onChange={handleGuestsChange}
                  required
                />
                <Form.Text className="text-muted">
                  This place has a maximum of {listing.maxGuests || 10} guests
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  Please select the number of guests
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-4">
            <Form.Label>Special Requests (Optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Let the host know if you have any special requests"
              onChange={(e) => onBookingDetailsChange({ specialRequests: e.target.value })}
            />
          </Form.Group>
          
          <div className="d-grid">
            <Button variant="primary" size="lg" type="submit">
              Continue to Payment
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BookingForm;