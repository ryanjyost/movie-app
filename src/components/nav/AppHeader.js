import React from "react";
import { connect } from "react-redux";
import Storage from "store";
import MenuIcon from "@material-ui/icons/MoreVert";
import {
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Link
} from "@material-ui/core";
import { NavLink, withRouter } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import HideOnScroll from "../hoc/HideOnScroll";
import { makeStyles } from "@material-ui/styles";
import { allRoutes } from "../routes";
import { Actions } from "../../redux";

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    height: 46,
    minHeight: 40
  },
  list: {
    width: 250
  },
  topSideBar: {
    backgroundColor: theme.palette.secondary.main,
    height: 50,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0px 20px",
    fontWeight: "bold"
  },
  createGroup: {
    backgroundColor: theme.palette.secondary.main
  }
}));

const AdapterLink = React.forwardRef((props, ref) => (
  <NavLink innerRef={ref} {...props} />
));

const SideList = ({ toggleDrawer, logout }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <div className={classes.topSideBar}>
        <Typography style={{ color: "#fff" }}>
          <strong>Movie Medium</strong>
        </Typography>
      </div>
      <List>
        {[
          { text: "Home", link: "/app" }
          // { text: "Create a group", link: "/create-group" }
        ].map((item, index) => (
          <ListItem component={AdapterLink} button key={index} to={item.link}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          { text: "How To Play", link: "/rules" },
          { text: "Terms of Use", link: "/terms" },
          { text: "Privacy Policy", link: "/privacy" }
        ].map((item, index) => (
          <ListItem component={AdapterLink} button key={index} to={item.link}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem
          component="a"
          button
          href={"mailto:ryanjyost@gmail.com?subject=Movie Medium"}
        >
          <ListItemText primary={"Contact"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          component={AdapterLink}
          to={"/app/account"}
          button
          key={"myAccount"}
        >
          <ListItemText primary={"My Account"} />
        </ListItem>
        <ListItem
          component={AdapterLink}
          to={"/"}
          button
          key={"logout"}
          onClick={() => {
            // Storage.clearAll();
            logout();
          }}
        >
          <ListItemText primary={"Log out"} />
        </ListItem>
      </List>
    </div>
  );
};

const SideMenu = ({ isOpen, toggleDrawer, logout }) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
      <SideList toggleDrawer={toggleDrawer} logout={logout} />
    </Drawer>
  );
};

const AppHeader = ({ children, disableHideOnScroll, location, logout }) => {
  const routeInfo = allRoutes.find(route => route.path === location.pathname);

  let title = "Movie Medium";

  if (routeInfo && routeInfo.title) {
    title = routeInfo.title;
  }

  const classes = useStyles();

  const [isOpen, setOpen] = React.useState(false);

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <HideOnScroll disable={disableHideOnScroll}>
      <AppBar>
        <SideMenu isOpen={isOpen} toggleDrawer={toggleDrawer} logout={logout} />
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="body1"
            style={{
              display: "flex",
              alignItems: "center",
              color: "rgba(255, 255, 255, 0.7)"
            }}
          >
            <Link
              component={AdapterLink}
              to={"/app"}
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                src="/mm_logo_round_white.png"
                width={24}
                style={{ marginRight: 6 }}
              />
            </Link>
            {title}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="Menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        {children}
      </AppBar>
    </HideOnScroll>
  );
};

const mapStateToProps = state => {
  return {
    styles: state.styles,
    user: state.user.user,
    userId: state.user.userId,
    userStatus: state.user.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDimensions: width => dispatch(Actions.styles.updateDimensions(width)),
    getUser: userId => dispatch(Actions.user.getUser.request(userId)),
    logout: () => dispatch(Actions.user.logout.request())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppHeader)
);
