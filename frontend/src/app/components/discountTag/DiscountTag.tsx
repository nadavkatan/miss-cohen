import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./styles/discountTag.css";

interface DiscountTagProps {
  discount: number;
}

export const DiscountTag: React.FC<DiscountTagProps> = ({ discount }) => {
  return (
    <Box className="discount-tag">
      <Typography variant="subtitle2" color="white">
        -{discount}%
      </Typography>
    </Box>
  );
};
