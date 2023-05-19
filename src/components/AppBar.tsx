import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppDrawer, { sidebarMenuItems } from "./AppDrawer";
import { Link } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";

const ButtonAppBar = () => {
  const { locations } = useContext(AppContext);
  const accessToken = localStorage.getItem("accessToken");

  const titleName = sidebarMenuItems.find(
    (item) => item.route === location.pathname
  )?.label;
  const selectedLocationId = localStorage.getItem("selectedLocation");
  const selectedLocation = locations.find(
    (location) => String(location.id) === selectedLocationId
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <AppDrawer />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {selectedLocation ? selectedLocation.name : ""}
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {titleName}
          </Typography>
          <Link
            to={accessToken ? "/logout" : "/login"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button color="inherit">{accessToken ? "Logout" : "Login"}</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
