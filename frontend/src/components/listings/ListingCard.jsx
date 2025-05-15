import React from "react";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import VerifiedBadge from "../reviews/VerifiedBadge";

const ListingCard = ({ listing }) => {
  // Destructure listing properties
  const { id, title, description, price, rating, images, category, location, verified } = listing;

  // Format price range if available
  const formatPrice = () => {
    if (typeof price === "object" && price.min && price.max) {
      return `$${price.min} - $${price.max}`;
    } else if (typeof price === "number") {
      return `$${price}`;
    }
    return "Contact for pricing";
  };

  return (
    <Card className="h-100 shadow-sm hover-effect">
      <Link to={`/listings/${id}`} className="text-decoration-none">
        <div className="position-relative">
          <Card.Img 
            variant="top" 
            src={images && images.length > 0 ? images[0] : "/assets/images/placeholder.jpg"} 
            alt={title}
            style={{ height: "200px", objectFit: "cover" }} 
          />
          <div className="position-absolute top-0 end-0 m-2">
            {verified && <VerifiedBadge />}
          </div>
          <Badge 
            bg="primary" 
            className="position-absolute bottom-0 start-0 m-2"
          >
            {category}
          </Badge>
        </div>
        
        <Card.Body>
          <Card.Title className="text-dark">{title}</Card.Title>
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-geo-alt me-1"></i>
            <small className="text-muted">{location}</small>
          </div>
          <Card.Text className="text-secondary text-truncate">
            {description}
          </Card.Text>
        </Card.Body>
        
        <Card.Footer className="d-flex justify-content-between align-items-center bg-white">
          <div className="d-flex align-items-center">
            <i className="bi bi-star-fill text-warning me-1"></i>
            <span>{rating || "New"}</span>
          </div>
          <strong>{formatPrice()}</strong>
        </Card.Footer>
      </Link>
    </Card>
  );
};

export default ListingCard;