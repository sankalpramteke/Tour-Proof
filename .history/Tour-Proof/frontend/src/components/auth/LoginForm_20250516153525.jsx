import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './Auth.css';

const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <Form onSubmit={handleSubmit} className="auth-form">
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          required
        />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </Form.Group>
      
      <Row className="mb-3">
        <Col>
          <Form.Check
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            label="Remember me"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
        </Col>
        <Col className="text-end">
          <Link to="/auth/forgot-password" className="auth-link">
            Forgot Password?
          </Link>
        </Col>
      </Row>
      
      <div className="d-grid">
        <Button variant="primary" type="submit" size="lg" className="w-100">
          Log In
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;