import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const MyBookings = () => {
  return (
    <Container className="py-5">
      <h2 className="text-light mb-4">My Bookings</h2>
      <Row>
        <Col>
          <Card style={{ backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: '12px' }}>
            <Card.Body className="text-light">
              <p className="text-center">No bookings found.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MyBookings;
