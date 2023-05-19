import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CategoryIcon from "@mui/icons-material/Category";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import ClassIcon from "@mui/icons-material/Class";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import LocationOnIcon from "@mui/icons-material/LocationOn";

type Anchor = "left";

export const sidebarMenuItems = [
  { id: 1, label: "Home", icon: <HomeIcon />, route: "/" },
  { id: 2, label: "Orders", icon: <RamenDiningIcon />, route: "/orders" },
  { id: 3, label: "Menus", icon: <RestaurantMenuIcon />, route: "/menus" },
  {
    id: 4,
    label: "Menu Categories",
    icon: <CategoryIcon />,
    route: "/menu-categories",
  },
  { id: 5, label: "Addons", icon: <LunchDiningIcon />, route: "/addons" },
  {
    id: 6,
    label: "Addon Categories",
    icon: <ClassIcon />,
    route: "/addon-categories",
  },
  {
    id: 7,
    label: "Locations",
    icon: <LocationOnIcon />,
    route: "/locations",
  },
  { id: 8, label: "Settings", icon: <SettingsIcon />, route: "/settings" },
];

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {sidebarMenuItems.slice(0, 7).map((item) => (
          <Link
            to={item.route}
            key={item.id}
            style={{ textDecoration: "none", color: "#636564" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {sidebarMenuItems.slice(-1).map((item) => (
          <Link
            to={item.route}
            key={item.id}
            style={{ textDecoration: "none", color: "#636564" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} sx={{ color: "white" }}>
            <MenuIcon />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
