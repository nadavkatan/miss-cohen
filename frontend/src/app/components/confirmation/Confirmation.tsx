import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import missCohenLogo from "../../assets/images/miss-cohen-logo.png";
import { useNavigate } from "react-router-dom";
import "./styles/confirmation.css";

interface ConfirmationProps {}

export const Confirmation: React.FC<ConfirmationProps> = ({}) => {
  const navigate = useNavigate();

  return (
    <Box className="confirmation-wrapper">
      <Typography variant="h3">Thanks for your order!</Typography>
      <Box className="confirmation-text-container">
        <Typography variant="body1">
          Your order was successfully placed and we'll start working on it right
          away!
        </Typography>
        <Typography variant="body1">
          You will soon receieve an additional confirmation email
        </Typography>
      </Box>

      <Box className="confirmation-logo-container">
        <img
          className="confirmation-logo"
          src={missCohenLogo}
          alt="miss-cohen-logo"
        />
      </Box>
      <Button variant="contained" onClick={() => navigate("/products")}>
        Continue shopping
      </Button>
    </Box>
  );
};
