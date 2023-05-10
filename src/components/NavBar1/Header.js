// IMPORTING APIS
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  Button,
  useScrollTrigger,
  Slide,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

// IMPORTING ICONS
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import SchoolIcon from "@material-ui/icons/School";
import PersonIcon from "@material-ui/icons/Person";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import Home from "../../Home/Home"



// LOCAL-STYLING
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction={"down"} in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <div className={classes.root}>
      <HideOnScroll {...props}>
        <BrowserRouter>
          <AppBar>
            <Toolbar>
              <Typography
                variant="h5"
                component="p"
                color="textSecondary"
                className={classes.title}
              >
                Minimercadito Mabel
              </Typography>
              {isMobile ? (
                <>
                  <IconButton
                    color="textPrimary"
                    className={classes.menuButton}
                    edge="start"
                    aria-label="menu"
                    onClick={handleMenu}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    KeepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                  >
                    <MenuItem
                      onClick={() => setAnchorEl(null)}
                      component={Link}
                      to={ "/"}
                    >
                      <ListItemIcon>
                        <HomeIcon />
                      </ListItemIcon>
                      <Typography variant="h6"> Home</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => setAnchorEl(null)}
                      component={Link}
                      to={"/College"}
                    >
                      <ListItemIcon>
                        <SchoolIcon />
                      </ListItemIcon>
                      <Typography variant="h6"> Ofertas </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => setAnchorEl(null)}
                      component={Link}
                      to={"/About"}
                    >
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <Typography variant="h6"> About</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => setAnchorEl(null)}
                      component={Link}
                      to={"/Personal"}
                    >
                      <ListItemIcon>
                        <BookmarksIcon />
                      </ListItemIcon>
                      <Typography variant="h6"> Personal </Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <div style={{ marginRight: "2rem" }}>
                  <Button variant="text" color="default"
                      component={Link}
                      to={"/"}
                      onClick={() => setAnchorEl(null)}>
                    <HomeIcon />
                    Home
                  </Button>
                  <Button variant="text" color="default" component={Link}
                      onClick={() => setAnchorEl(null)}
                      to={"/College"}>
                    <SchoolIcon />
                    College
                  </Button>
                  <Button variant="text" color="default" component={Link}
                      onClick={() => setAnchorEl(null)}
                      to={"/About"}>
                    <PersonIcon />
                    About
                  </Button>
                  <Button variant="text" color="default"component={Link}
                      onClick={() => setAnchorEl(null)}
                      to={"/Personal"}>
                    <BookmarksIcon />
                    Personal
                  </Button>
                </div>
              )}
            </Toolbar>
          </AppBar>
       <Switch>
            <Route exact path={"/"} component={Home} />
             {/*   <Route exact path={process.env.PUBLIC_URL + "/College"} component={College} />
            <Route exact path={process.env.PUBLIC_URL + "/About"} component={About} />
            <Route exact path={process.env.PUBLIC_URL + "/Personal"} component={Personal} />*/}
          </Switch> 
        </BrowserRouter>
      </HideOnScroll>
    </div>
  );
};

export default Header;
