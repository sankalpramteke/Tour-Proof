import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import './About.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="hero-section">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} className="text-center">
                <h1 className="hero-title">About TourProof</h1>
                <p className="hero-text">
                  TourProof is revolutionizing the travel industry by combining the security of blockchain
                  technology with a user-friendly booking and review platform. Our mission is to create a
                  transparent ecosystem where travelers can trust reviews and businesses can showcase their
                  authentic customer experiences.
                </p>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="features-section">
          <Container>
            <h2 className="section-title">How Blockchain Verification Works</h2>
            <Row className="g-4">
              <Col md={4}>
                <Card className="feature-card">
                  <Card.Body>
                    <div className="feature-icon">
                      <div className="icon-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="h5 mb-3">Verified Bookings</h3>
                    <p className="text-muted">
                      Every booking made through TourProof is recorded on the blockchain, creating an immutable record of your stay or experience.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="feature-card">
                  <Card.Body>
                    <div className="feature-icon">
                      <div className="icon-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="h5 mb-3">Authentic Reviews</h3>
                    <p className="text-muted">
                      Only users who have completed a verified booking can leave reviews, ensuring all feedback is from genuine experiences.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="feature-card">
                  <Card.Body>
                    <div className="feature-icon">
                      <div className="icon-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="h5 mb-3">Token Rewards</h3>
                    <p className="text-muted">
                      Earn tokens for verified reviews that can be used for discounts and special perks.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="stats-section">
          <Container>
            <Row className="justify-content-center text-center">
              <Col md={4}>
                <div className="stat-item">
                  <h3>1M+</h3>
                  <p>Verified Reviews</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="stat-item">
                  <h3>50K+</h3>
                  <p>Happy Travelers</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="stat-item">
                  <h3>100%</h3>
                  <p>Secure Transactions</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="team-section">
          <Container>
            <h2 className="section-title">Our Team</h2>
            <Row className="justify-content-center g-4">
              <Col md={4} className="text-center">
                <div className="mb-4">
                  <Image
                    src="/api/placeholder/128/128"
                    alt="Alex Johnson"
                    roundedCircle
                    width={128}
                    height={128}
                  />
                </div>
                <h3 className="h5 mb-2">Alex Johnson</h3>
                <p className="text-muted">CEO & Founder</p>
              </Col>
              <Col md={4} className="text-center">
                <div className="mb-4">
                  <Image
                    src="/api/placeholder/128/128"
                    alt="Sophia Chen"
                    roundedCircle
                    width={128}
                    height={128}
                  />
                </div>
                <h3 className="h5 mb-2">Sophia Chen</h3>
                <p className="text-muted">CTO</p>
              </Col>
              <Col md={4} className="text-center">
                <div className="mb-4">
                  <Image
                    src="/api/placeholder/128/128"
                    alt="Michael Rivera"
                    roundedCircle
                    width={128}
                    height={128}
                  />
                </div>
                <h3 className="h5 mb-2">Michael Rivera</h3>
                <p className="text-muted">Head of Product</p>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="faq-section">
          <Container>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <Row className="justify-content-center">
              <Col lg={8}>
                <Card className="mb-4">
                  <Card.Body>
                    <h3 className="h5 mb-3">How does TourProof verify reviews?</h3>
                    <p className="text-muted">
                      TourProof verifies reviews by linking them to actual bookings made through our platform. 
                      When you complete a stay or experience, you'll be eligible to leave a review. This review 
                      is then hashed and stored on the blockchain, creating an immutable record that proves you 
                      actually experienced the service you're reviewing.
                    </p>
                  </Card.Body>
                </Card>
                
                <Card className="mb-4">
                  <Card.Body>
                    <h3 className="h5 mb-3">What are TourProof tokens?</h3>
                    <p className="text-muted">
                      TourProof tokens are rewards you earn for contributing verified reviews to our platform. 
                      These tokens can be used for discounts on future bookings, unlocking premium features, or 
                      exchanged with partner businesses for special offers.
                    </p>
                  </Card.Body>
                </Card>
                
                <Card className="mb-4">
                  <Card.Body>
                    <h3 className="h5 mb-3">Do I need a cryptocurrency wallet to use TourProof?</h3>
                    <p className="text-muted">
                      While connecting a wallet like MetaMask enhances your experience by giving you full control 
                      over your tokens and verification, it's not required. You can use TourProof with traditional 
                      authentication methods and we'll manage your blockchain interactions in the background.
                    </p>
                  </Card.Body>
                </Card>
                
                <Card className="mb-4">
                  <Card.Body>
                    <h3 className="h5 mb-3">How is my data protected?</h3>
                    <p className="text-muted">
                      TourProof is committed to data security and privacy. We encrypt sensitive information and 
                      follow GDPR compliance for user data. While booking and review verification data is stored 
                      on the blockchain for transparency, personal identifying information is kept secure in our 
                      encrypted database.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
    </div>
  );
};

export default AboutPage;