import React from "react";
import { Row, Col, Carousel, Badge } from "react-bootstrap";
import VerifiedBadge from "../reviews/VerifiedBadge";

const ListingDetail = ({ listing }) => {
  const {
    title,
    description,
    location,
    category,
    images,
    amenities,
    verified,
    owner
  } = listing;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>{title}</h1>
        {verified && <VerifiedBadge />}
      </div>

      <div className="d-flex align-items-center mb-4">
        <i className="bi bi-geo-alt me-1"></i>
        <span className="me-3">{location}</span>
        <Badge bg="primary">{category}</Badge>
      </div>

      {images && images.length > 0 && (
        <div className="listing-images mb-4">
          <Carousel variant="dark" className="listing-carousel shadow-sm">
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image}
                  alt={`${title} - image ${index + 1}`}
                  style={{ height: "400px", objectFit: "cover" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}

      <div className="listing-description my-4">
        <h3>About this place</h3>
        <p>{description}</p>
      </div>

      {amenities && amenities.length > 0 && (
        <div className="listing-amenities my-4">
          <h3>What this place offers</h3>
          <Row xs={1} md={2} className="g-3 mt-2">
            {amenities.map((amenity, index) => (
              <Col key={index}>
                <div className="d-flex align-items-center">
                  <i className={`bi bi-check-circle me-2 text-success`}></i>
                  <span>{amenity}</span>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {owner && (
        <div className="listing-host my-4">
          <h3>Hosted by {owner.name}</h3>
          <div className="d-flex align-items-center mt-2">
            <img
              src={owner.profileImage || "/assets/images/default-avatar.png"}
              alt={owner.name}
              className="rounded-circle me-3"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <div>
              <p className="mb-1">Member since {owner.joinedDate}</p>
              <div className="d-flex align-items-center">
                <i className="bi bi-star-fill text-warning me-1"></i>
                <span>{owner.rating} · {owner.totalReviews} reviews</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListingDetail;