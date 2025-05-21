import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './Contact.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-page">
      <section className="hero-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h1 className="hero-title">Contact Us</h1>
              <p className="hero-text">
                Have questions about TourProof? We're here to help! Reach out to us using the form below.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="contact-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <Card className="contact-card">
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Your message"
                        required
                      />
                    </Form.Group>

                    <Button type="submit" className="submit-btn w-100">
                      Send Message
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <div className="contact-info">
                <Card className="info-card mb-4">
                  <Card.Body>
                    <h3>Office Location</h3>
                    <p>
                      <i className="bi bi-geo-alt-fill"></i>
                      123 TourProof Street
                      <br />
                      Mumbai, India 400001
                    </p>
                  </Card.Body>
                </Card>

                <Card className="info-card mb-4">
                  <Card.Body>
                    <h3>Contact Info</h3>
                    <p>
                      <i className="bi bi-envelope-fill"></i>
                      info@tourproof.com
                    </p>
                    <p>
                      <i className="bi bi-telephone-fill"></i>
                      +91 123-456-7890
                    </p>
                  </Card.Body>
                </Card>

                <Card className="info-card">
                  <Card.Body>
                    <h3>Business Hours</h3>
                    <p>
                      <i className="bi bi-clock-fill"></i>
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 10:00 AM - 4:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ContactPage;
