import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import ThemeContext from "../Context/ThemeContext";
import { createTheme, useTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import userAvatar from "../Images/userAvatar.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserIdContext from "../Context/UserIdContext";
import MonitorHeart from "@mui/icons-material/MonitorHeart";


const host = "http://localhost:5555";
const pages = ["Dashboard", "Your Wishlist"];
const settings = ["Profile", "Account", "Dashboard", "Whishlist", "Logout"];

// Making Palette for the Materual Ui components in dark and light mode
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === "dark"
        ? {
            main: "#5e58d0",
          }
        : {
            main: "#6208eb",
          }),
    },
    ...(mode === "dark"
      ? {
          background: {
            default: "#5e58d0",
            paper: "#5e58d0",
          },
          // 6208eb
        }
      : {
          background: {
            default: "#6208eb",
            paper: "#6208eb",
          },
        }),
    text: {
      ...(mode === "light"
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: "#fff",
            secondary: "#fff",
          }),
    },
  },
});

function Navbar() {
  const navigate = useNavigate();

  // using Theme and User Id contexts
  const { darkMode } = React.useContext(ThemeContext);
  const { userId, setUserId } = React.useContext(UserIdContext);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const darkModeTheme = createTheme(getDesignTokens("dark"));
  const lightModeTheme = createTheme(getDesignTokens("light"));

  // Functions to handle the opening and closing of Nav and User Menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = async (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = async (event) => {
    setAnchorElUser(null);
  };

  // Function to logout the user

  const handleLogoutClick = async () => {
    try {
      const response = await axios.get(`${host}/api/logout`);
      const result = response.data;
      setUserId("");
      navigate("/");
      console.log(result);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <ThemeProvider theme={darkMode ? darkModeTheme : lightModeTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <MonitorHeart sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

            <Typography
              variant="h6"
              noWrap
              href="/dashboard"
              component={"a"}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              STOCK MONITOR
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <MonitorHeart sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/dashboard"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              STOCK MONITOR
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link
                    href={`/dashboard`}
                    sx={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    {page}
                  </Link>
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Bemy Sharp" src={userAvatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    value={setting}
                    sx={{color: 'white'}}
                    onClick={
                      setting === "Logout"
                        ? handleLogoutClick
                        : handleCloseUserMenu
                    }
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default Navbar;
