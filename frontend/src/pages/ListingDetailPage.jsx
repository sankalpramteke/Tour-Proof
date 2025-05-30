import React, { useEffect, useState } from "react";
import "./Listings.css";
import { Container, Row, Col, Button, Carousel, Card, Badge } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import ListingDetail from "../components/listings/ListingDetail";
import ReviewsList from "../components/listings/ReviewsList";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { listingsService } from "../services/listings.service";
import { reviewsService } from "../services/reviews.service";

const ListingDetailPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListingData = async () => {
      try {
        setLoading(true);
        
        // Fetch listing details
        const listingData = await listingsService.getListingById(id);
        setListing(listingData.data);
        
        // Fetch listing reviews
        const reviewsData = await reviewsService.getReviewsByListingId(id);
        setReviews(reviewsData.data);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching listing details:", err);
        setError("Failed to load listing details. Please try again later.");
        setLoading(false);
      }
    };

    fetchListingData();
  }, [id]);

  if (loading) {
    return (
      <div className="listing-detail-container text-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="listing-detail-container text-center">
        <h3>Error loading listing</h3>
        <p>{error}</p>
        <Link to="/listings" className="btn btn-primary mt-3">
          Back to Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="listing-detail-container my-5">
      <Row>
        <Col lg={8}>
          <ListingDetail listing={listing} />
        </Col>
        
        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: "20px" }}>
            <Card.Body>
              <h3 className="mb-3">₹{listing.priceRange.min} - ₹{listing.priceRange.max} / night</h3>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-star-fill text-warning me-1"></i>
                <span>{listing.averageRating}</span>
                <span className="mx-1">•</span>
                <span>{listing.reviewCount} reviews</span>
              </div>
              
              <Link to={`/booking/${id}`} className="w-100">
                <Button variant="primary" size="lg" className="w-100 mb-3">
                  Book this place
                </Button>
              </Link>
              
              <div className="text-center text-muted small">
                <i className="bi bi-shield-check me-1"></i>
                Your booking will be secured with blockchain verification
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <hr className="my-5" />
      
      <Row className="mb-5">
        <Col>
          <h3 className="mb-4">{reviews.length} Verified Reviews</h3>
          <ReviewsList reviews={reviews} />
        </Col>
      </Row>
    </div>
  );
};

export default ListingDetailPage;