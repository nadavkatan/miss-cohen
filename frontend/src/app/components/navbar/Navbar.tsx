import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import logo from "../../assets/images/miss-cohen-logo.png";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks";
import Cart from "../cart/Cart";
import { checkAuth, logout } from "../../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Product } from "../../features/products/productsSlice";
import { useMediaQuery } from "@mui/material";
import { addToCart } from "../../features/cart/cartSlice";
import { useTheme } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

interface AutoCompleteOption extends Product {
  label: string;
}

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [autoCompleteOptions, setAutoCompleteOptions] = React.useState<
    AutoCompleteOption[]
  >([]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { cartItems } = useAppSelector((state) => state.cart);
  const { currentUser, isAuth } = useAppSelector((state) => state.auth);
  const { products } = useAppSelector((state) => state.products);

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const goToMyOrders = () => {
    handleMenuClose();
    toast("Coming up...");
    // navigate(`orders/${currentUser?._id}`);
  };

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logout());
    toast("You are logged out");
  };
  const handleLogin = () => {
    handleMenuClose();
    navigate("/signin");
  };

  React.useEffect(() => {
    dispatch(checkAuth());
  }, []);

  React.useEffect(() => {
    if (products && !autoCompleteOptions.length) {
      const options = products.map((product) => {
        return {
          label: product.name,
          ...product,
        };
      });
      setAutoCompleteOptions(options);
    }
  }, [products]);

  const menuId = "primary-search-account-menu";
  const renderMenu = isAuth ? (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={goToMyOrders}>My orders</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  ) : (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogin}>Login</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Cart />
        <p>Basket</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" color="inherit">
          <PersonIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "fixed",
        top: 0,
        width: "100%",
        // backgroundColor: "#FFF9CA",
        backgroundColor: "white",
        zIndex: 20,
      }}
    >
      <ToastContainer />
      <AppBar position="static" color="transparent">
        <Toolbar>
          <img
            src={logo}
            alt="logo"
            style={{ width: "4em", padding: "0.4em", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          {isLargeScreen && (
            <Search>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={autoCompleteOptions}
                sx={{ width: 300 }}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{
                      "& > img": {
                        mr: 2,
                        flexShrink: 0,
                      },
                    }}
                    {...props}
                  >
                    <Typography
                      style={{ marginRight: "auto" }}
                      variant="subtitle2"
                      onClick={() => dispatch(addToCart({ qty: 1, ...option }))}
                    >
                      {option.label}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      onClick={() => dispatch(addToCart({ qty: 1, ...option }))}
                    >
                      €
                      {option.onSale
                        ? option.price - option.price * (option.discount / 100)
                        : option.price}
                    </Typography>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Search product…" />
                )}
              />
            </Search>
          )}

          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: "none", md: "flex", alignItems: "center" } }}
          >
            {currentUser && (
              <Typography variant="subtitle1" color="primary">
                {currentUser.firstName}
              </Typography>
            )}
            <IconButton
              size="large"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <PersonIcon />
            </IconButton>
            <Cart />
          </Box>
          {cartItems.length ? (
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <Badge
                  badgeContent={cartItems.reduce(
                    (total, items) => total + items.qty,
                    0
                  )}
                  color="error"
                >
                  <MoreIcon />
                </Badge>
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
