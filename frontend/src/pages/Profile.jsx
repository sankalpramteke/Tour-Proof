import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card style={{ backgroundColor: '#1A1A1A', border: '1px solid #333', borderRadius: '12px' }}>
            <Card.Body className="text-center p-4">
              <Image
                src={currentUser?.picture}
                alt={currentUser?.name}
                roundedCircle
                width={120}
                height={120}
                className="mb-4"
              />
              <h2 className="text-light mb-4">{currentUser?.name}</h2>
              <p className="text-light mb-2">
                <strong>Email:</strong> {currentUser?.email}
              </p>
              <p className="text-light">
                <strong>Member since:</strong> {new Date().toLocaleDateString()}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
