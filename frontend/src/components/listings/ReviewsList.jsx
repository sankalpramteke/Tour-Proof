import React, { useState } from "react";
import { Row, Col, Card, Pagination, Button } from "react-bootstrap";

const ReviewsList = ({ reviews }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  
  // Calculate reviews to display on current page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  
  // Calculate total pages
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  
  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Generate star rating display
  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i 
          key={i} 
          className={`bi ${i <= rating ? 'bi-star-fill' : 'bi-star'} text-warning`}
        ></i>
      );
    }
    return stars;
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-5">
        <p>No reviews yet for this listing</p>
        <Button variant="outline-primary">Be the first to leave a review</Button>
      </div>
    );
  }

  return (
    <div className="reviews-list">
      {currentReviews.map((review) => (
        <Card key={review.id} className="mb-3 border-0 shadow-sm">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className="d-flex align-items-center">
                <img
                  src={review.user.avatar || "/assets/images/default-avatar.png"}
                  alt={review.user.name}
                  className="rounded-circle me-3"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
                <div>
                  <h5 className="mb-0">{review.user.name}</h5>
                  <small className="text-muted">{formatDate(review.createdAt)}</small>
                </div>
              </div>
              <div className="verification-badge">
                <i className="bi bi-patch-check-fill text-primary me-1"></i>
                <small>Blockchain Verified</small>
              </div>
            </div>
            
            <div className="mb-2">
              {renderStarRating(review.rating)}
            </div>
            
            <p className="review-content">{review.content}</p>
            
            {review.images && review.images.length > 0 && (
              <Row xs={2} md={3} className="g-2 mt-2">
                {review.images.map((image, index) => (
                  <Col key={index}>
                    <img
                      src={image}
                      alt={`Review image ${index + 1}`}
                      className="img-thumbnail"
                      style={{ objectFit: "cover", height: "100px" }}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Card.Body>
        </Card>
      ))}
      
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev 
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            />
            
            {pageNumbers.map(number => (
              <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </Pagination.Item>
            ))}
            
            <Pagination.Next
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ReviewsList;