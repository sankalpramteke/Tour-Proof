import React from 'react';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  return (
    <Link to={`/listings/${listing.id}`} className="text-decoration-none">
      <div className="listing-card">
        <div className="position-relative">
          <img 
            src={listing.images[0]} 
            alt={listing.title}
            className="w-100"
          />
          <div className="verified-badge">
            <i className="bi bi-patch-check-fill"></i> Verified
          </div>
        </div>
        <div className="listing-card-content">
          <h5 className="mb-2">{listing.title}</h5>
          <p className="text-muted mb-2">
            <i className="bi bi-geo-alt me-1"></i>
            {listing.location}
          </p>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="rating">
              <i className="bi bi-star-fill text-warning me-1"></i>
              <span>{listing.averageRating}</span>
              <span className="text-muted">({listing.reviewCount} reviews)</span>
            </div>
          </div>
          <div className="price">
            <span className="fs-5 fw-bold text-primary">
              ₹{listing.priceRange.min} - ₹{listing.priceRange.max}
            </span>
            <span className="text-muted"> / night</span>
          </div>
          <div className="amenities mt-2">
            {listing.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="badge bg-light text-dark me-2">{amenity}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;