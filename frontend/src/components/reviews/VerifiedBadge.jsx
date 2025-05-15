import React from "react";
import { OverlayTrigger, Tooltip, Badge } from "react-bootstrap";

const VerifiedBadge = () => {
  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id="verified-tooltip">
          This listing has blockchain-verified reviews
        </Tooltip>
      }
    >
      <Badge bg="success" className="d-flex align-items-center">
        <i className="bi bi-check-circle-fill me-1"></i>
        Verified
      </Badge>
    </OverlayTrigger>
  );
};

export default VerifiedBadge;