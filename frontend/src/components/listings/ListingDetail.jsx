import React from "react";
import { Row, Col, Carousel } from "react-bootstrap";

const ListingDetail = ({ listing }) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>{listing.title}</h1>
        <div className="verified-badge">
          <i className="bi bi-patch-check-fill"></i> Verified
        </div>
      </div>

      <div className="d-flex align-items-center mb-4">
        <i className="bi bi-geo-alt me-1"></i>
        <span className="me-3">{listing.location}</span>
      </div>

      <div className="listing-images mb-4">
        <Carousel variant="dark" className="listing-carousel shadow-sm">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={listing.images[0]}
              alt={listing.title}
              style={{ height: "400px", objectFit: "cover" }}
            />
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="listing-description my-4">
        <h3>About this place</h3>
        <p>{listing.description}</p>
      </div>

      <div className="listing-amenities my-4">
        <h3>What this place offers</h3>
        <Row xs={1} md={2} className="g-3 mt-2">
          {listing.amenities.map((amenity, index) => (
            <Col key={index}>
              <div className="d-flex align-items-center">
                <i className="bi bi-check-circle me-2 text-success"></i>
                <span>{amenity}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>


    </>
  );
};

export default ListingDetail;