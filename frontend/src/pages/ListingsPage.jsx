import React, { useEffect, useState } from "react";
import "./Listings.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import ListingCard from "../components/listings/ListingCard";
import SearchFilters from "../components/listings/SearchFilters";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { listingsService } from "../services/listings.service";

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: "",
    priceMin: "",
    priceMax: "",
    rating: "",
    category: ""
  });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        // Apply filters to the API call
        const response = await listingsService.getAllListings(filters);
        setListings(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setLoading(false);
      }
    };

    fetchListings();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div className="listing-page-container">
      <Row>
        <Col>
          <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
        </Col>
      </Row>

      {loading ? (
        <div className="text-center my-5">
          <LoadingSpinner />
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center my-5">
          <h3>No listings found</h3>
          <p>Try adjusting your search filters</p>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {listings.map((listing) => (
            <Col key={listing.id}>
              <ListingCard listing={listing} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ListingsPage;