import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSession, signOut } from "next-auth/react";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CategoryIcon from "@mui/icons-material/Category";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import ClassIcon from "@mui/icons-material/Class";
import SettingsIcon from "@mui/icons-material/Settings";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Image from "next/image";
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
    label: "Settings",
    icon: <SettingsIcon />,
    route: "/backoffice/settings",
  },
];
interface Props {
  title?: string;
}
const NavBar = (props: Props) => {
  const { data: session } = useSession();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "#1B9C85" }}>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {selectedLocation ? selectedLocation.name : ""}
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.title || titleName || ""}
          </Typography> */}

          {session ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box></Box>
              <Box>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, textAlign: "center" }}
                >
                  HAPPY POS
                </Typography>
              </Box>

              <Button variant="text" color="inherit" onClick={() => signOut()}>
                sign Out
              </Button>
            </Box>
          ) : (
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              Happy POS
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
