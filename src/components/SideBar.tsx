import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CategoryIcon from "@mui/icons-material/Category";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import ClassIcon from "@mui/icons-material/Class";
import SettingsIcon from "@mui/icons-material/Settings";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TableBarIcon from "@mui/icons-material/TableBar";
import Link from "next/link";
const SideBar = () => {
  return (
    <Box
      sx={{
        minWidth: 230,
        backgroundColor: "#1B9C85",
        borderTopRightRadius: "20px",
      }}
    >
      <List sx={{ p: 0 }}>
        {sidebarMenuItems.slice(0, 7).map((item) => (
          <Link
            key={item.id}
            href={item.route}
            style={{ textDecoration: "none", color: "#313131" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "#E8F6EF" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} sx={{ color: "#E8F6EF" }} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider variant="middle" sx={{ backgroundColor: "#FFE194", mt: 2 }} />
      <List>
        {sidebarMenuItems.slice(-1).map((item) => (
          <Link
            key={item.id}
            href={item.route}
            style={{ textDecoration: "none", color: "#313131" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "#E8F6EF" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} sx={{ color: "#E8F6EF" }} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
};

export default SideBar;

export const sidebarMenuItems = [
  {
    id: 1,
    label: "Orders",
    icon: <RamenDiningIcon />,
    route: "/backoffice/orders",
  },

  {
    id: 2,
    label: "Menu Categories",
    icon: <CategoryIcon />,
    route: "/backoffice/menuCategories",
  },
  {
    id: 3,
    label: "Menus",
    icon: <RestaurantMenuIcon />,
    route: "/backoffice/menus",
  },

  {
    id: 4,
    label: "Addon Categories",
    icon: <ClassIcon />,
    route: "/backoffice/addonCategories",
  },
  {
    id: 5,
    label: "Addons",
    icon: <LunchDiningIcon />,
    route: "/backoffice/addons",
  },
  {
    id: 6,
    label: "Locations",
    icon: <LocationOnIcon />,
    route: "/backoffice/locations",
  },
  {
    id: 7,
    label: "Tables",
    icon: <TableBarIcon />,
    route: "/backoffice/tables",
  },
  {
    id: 8,
    label: "Settings",
    icon: <SettingsIcon />,
    route: "/backoffice/settings",
  },
];
