import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import IconButton from "@mui/material/IconButton";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./styles/footer.css";

interface FooterProps {}
const styles = {
  largeIcon: {
    width: 60,
    height: 60,
  },
};

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Box className="footer-wrapper">
      <Box className="icons-container">
        <IconButton>
          <FacebookIcon color="inherit" />
        </IconButton>
        <IconButton>
          <InstagramIcon color="inherit" />
        </IconButton>
        <IconButton>
          <TwitterIcon color="inherit" />
        </IconButton>
      </Box>
      <Box className="footer-customer-support">
        <Typography variant="subtitle2">
          Customer support: +123456789
        </Typography>
      </Box>
      <Box className="footer-credit">
        <Typography variant="subtitle2">
          © Website developed by Nadav Katan
        </Typography>
      </Box>
    </Box>
  );
};
