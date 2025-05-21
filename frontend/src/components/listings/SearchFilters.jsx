import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Card } from "react-bootstrap";

const SearchFilters = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(localFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      location: "",
      priceMin: "",
      priceMax: "",
      rating: "",
      category: ""
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="filter-section mb-4">
      <Card.Body>
        <div 
          className="d-flex justify-content-between align-items-center mb-3 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <h5 className="mb-0">Filter Results</h5>
          <i className={`bi bi-chevron-${expanded ? 'up' : 'down'}`}></i>
        </div>
        
        <div className={`filter-content ${expanded ? 'show' : ''}`}>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <Form.Select
                    name="location"
                    value={localFilters.location}
                    onChange={handleInputChange}
                  >
                    <option value="">All locations</option>
                    <option value="Goa, India">Goa, India</option>
                    <option value="Himachal Pradesh, India">Himachal Pradesh, India</option>
                    <option value="Mumbai, India">Mumbai, India</option>
                    <option value="Kerala, India">Kerala, India</option>
                    <option value="Rajasthan, India">Rajasthan, India</option>
                    <option value="Uttarakhand, India">Uttarakhand, India</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Min Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="priceMin"
                    placeholder="Min $"
                    value={localFilters.priceMin}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Max Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="priceMax"
                    placeholder="Max $"
                    value={localFilters.priceMax}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Rating</Form.Label>
                  <Form.Select
                    name="rating"
                    value={localFilters.rating}
                    onChange={handleInputChange}
                  >
                    <option value="">Any rating</option>
                    <option value="4">4+ stars</option>
                    <option value="3">3+ stars</option>
                    <option value="2">2+ stars</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={2}>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={localFilters.category}
                    onChange={handleInputChange}
                  >
                    <option value="">All types</option>
                    <option value="villa">Villa</option>
                    <option value="lodge">Mountain Lodge</option>
                    <option value="apartment">Apartment</option>
                    <option value="resort">Resort</option>
                    <option value="heritage">Heritage Hotel</option>
                    <option value="cottage">Cottage</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <div className="mt-3 d-flex justify-content-end">
              <Button 
                variant="outline-secondary" 
                className="me-2"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button type="submit" variant="primary">
                Apply Filters
              </Button>
            </div>
          </Form>
        </div>
      </Card.Body>
    </div>
  );
};

export default SearchFilters;