/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Card,
  CardActions,
  CardContent,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import {
  ChevronLeft,
  ChevronRight,
  Dashboard,
  EmailOutlined,
  Inbox,
  LocalOffer,
  LocalPhoneOutlined,
  Mail,
  Phone,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import "./Sidebar.css";
import { logout } from '../../actions'
import userImg from "../../img/user.png";
import { Link } from "react-router-dom";
import { getDatabase, ref, child, get } from "firebase/database";
import { useNavigate } from "react-router-dom";

const drawerWidth = 280;

// const settings = ["Profile", "Logout"];

const useStyles = makeStyles((theme) => ({
  customTooltip: {
    position: "relative !important",
    backgroundColor: "#292929 !important",
    color: "#fff",
    fontSize: "13px !important",
    border: "1px solid #292929",
    borderRadius: "4px !important",
    padding: "0.8rem !important",
    "&:before": {
      content: "''",
      position: "absolute",
      top: "-20px",
      left: "50%",
      transform: "translateX(-50%)",
      border: "10px solid transparent",
      borderBottomColor: "#292929",
      // backgroundColor: "#292929"
    },
  },
}));

function ClippedSidebar() {
  const auth = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(false);
  const [manager, setManager] = useState({name: "", cta: {mail: "", phone: "", skype: ""}});
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleDrawer = () => {
    setOpen(!open);
  };

  const logoutBtn = () => {
      dispatch(logout())
      navigate('/user/login')
    }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    if(auth.user) {
    const dbRef = ref(getDatabase());
    const user = JSON.parse(localStorage.getItem("user"));

    // Get UserId from DB
    get(child(dbRef, `users/${user.uid}`))
      .then((snapshot) => {
        setUser(snapshot.val())
        if (snapshot.exists()) {
          let manager = snapshot.val().manager
          get(child(dbRef, `managers/${manager}`))
          .then((snap) => {
            if (snap.exists()) {
              setManager(snap.val());
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }, []);

  // const CustomToolTip = styled(({ className, ...props }) => (
  //   <Tooltip {...props} classes={{ popper: className }} />
  // ))(({ theme }) => ({
  //   [`& .${tooltipClasses.tooltip}`]: {
  //     backgroundColor: '#292929',
  //     color: '#ffffff',
  //     maxWidth: 220,
  //     fontSize: "13px",
  //     border: '1px solid #292929',
  //     padding: "1rem"
  //   },
  // }));

  return (
    <>
      {/* <Container> */}
      <Box
        className="topbar"
        sx={{
          padding: "0rem 2rem",
          display: "flex",
          // borderBottom: "1px solid #eaecef",
        }}
      >
        <CssBaseline />
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Box>
            <IconButton
              sx={{
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawer}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box>
            <Tooltip
              classes={{ tooltip: classes.customTooltip }}
              title="Approved Balance"
            >
              <Button>
                <span>
                  <AccountBalanceWalletIcon sx={{ color: "#27AE60", mr: 1 }} />
                </span>
                <span>₹ 0.00</span>
              </Button>
            </Tooltip>
            <Button>
              <span>
                <QueryBuilderOutlinedIcon sx={{ mr: 1 }} />
                UTC + 1
              </span>
            </Button>
            <Button sx={{ flexGrow: 0 }}>
              <Box
                sx={{ display: "flex", alignItems: "center" }}
                onClick={handleOpenUserMenu}
              >
                <Avatar
                  alt="User Account"
                  src={userImg}
                  sx={{ marginRight: "1rem", width: 35, height: 35 }}
                />
                <Box>
                  <p style={{ fontSize: "14px", color: "#FFFFFF" }}>
                    {user.username}
                  </p>
                  <p style={{ fontSize: "13px", color: "#8B979E" }}>
                    Affialiate #2
                  </p>
                </Box>
              </Box>
              {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton> */}
              <Menu
                sx={{ mt: "4rem" }}
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
                 <MenuItem onClick={handleCloseUserMenu}>
                 <a onClick={logoutBtn} style={{cursor: "pointer"}}>Logout</a>
                </MenuItem>
                {/* {settings.map((setting) => (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to="/profile/personal"></Link>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
                 ))}  */}
              </Menu>
            </Button>
          </Box>
        </header>
      </Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "4.2rem",
            paddingTop: "1rem",
            backgroundColor: "#202530",
            color: "#8B979E",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        hideBackdrop={true}
        onClose={() => {
          setOpen(false);
        }}
      >
        <List>
          <Container sx={{ marginBottom: "1rem" }}>
            <ListItem
              className="sidebarListItem"
              focusVisibleClassName=""
              button
            >
              <ListItemIcon>
                <Dashboard className="sidebarListIcon" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Container>
          <Container sx={{ marginBottom: "1rem" }}>
            <Link to="/affiliate/offers">
              <ListItem
                className="sidebarListItem"
                focusVisibleClassName=""
                button
              >
                <ListItemIcon>
                  <LocalOffer className="sidebarListIcon" />
                </ListItemIcon>
                <ListItemText primary="Offers" />
              </ListItem>
            </Link>
          </Container>
        </List>
        <Container>
          <Typography
            sx={{
              color: "#4d5863",
              fontSize: "12px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              lineHeight: "25px",
            }}
            variant="h6"
          >
            Your Manager
          </Typography>
          <Card
            variant="outlined"
            sx={{
              backgroundColor: "transparent",
              padding: "2rem 0",
              borderColor: "#2b303b",
            }}
          >
            <CardContent>
              <Box>
                <Avatar
                  alt="User Account"
                  src={userImg}
                  sx={{ width: 56, height: 56, margin: "auto" }}
                />
                <p
                  style={{
                    color: "#BEC3C9",
                    fontSize: "16px",
                    fontWeight: "light",
                    textAlign: "center",
                    marginTop: "1rem",
                  }}
                >
                  {manager.name}
                </p>
              </Box>
            </CardContent>
            <CardActions
              sx={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <Box sx={{ marginLeft: "8px" }}>
                <EmailOutlined
                  fontSize="small"
                  sx={{ marginRight: "1rem", color: "#4D5863" }}
                />
                <a href={manager.cta.mail}>{manager.cta.mail}</a>
              </Box>
              <Box>
                <LocalPhoneOutlined
                  fontSize="small"
                  sx={{ marginRight: "1rem", color: "#4D5863" }}
                />
                <a href={`tel:${manager.cta.phone}`}>{manager.cta.phone}</a>
              </Box>
              <Box>
                <Mail
                  fontSize="small"
                  sx={{ marginRight: "1rem", color: "#4D5863" }}
                />
                <a href="#">{manager.cta.skype}</a>
              </Box>
              {/* <Button size="small">Learn More</Button> */}
            </CardActions>
          </Card>
        </Container>
      </Drawer>
      {/* </Container> */}
    </>
  );
}

export default ClippedSidebar;
