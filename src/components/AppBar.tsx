import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppDrawer, { sidebarMenuItems } from "./AppDrawer";
import Link from "next/link";
import { BackOfficeContext } from "../contexts/BackOfficeContext";
import { useContext, useEffect, useState } from "react";
import { getSelectedLocationId } from "@/utils";
import { useSession, signIn, signOut } from "next-auth/react";

interface Props {
  title?: string;
}

const ButtonAppBar = (props: Props) => {
  const { locations } = useContext(BackOfficeContext);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    null
  );
  const { data: session } = useSession();
  let titleName;
  if (typeof window !== "undefined") {
    titleName = sidebarMenuItems.find(
      (item) => item.route === location.pathname
    )?.label;
  }

  // const selectedLocationId = getSelectedLocationId();

  useEffect(() => {
    setSelectedLocationId(localStorage.getItem("selectedLocation"));
  });

  if (selectedLocationId === null) return;

  const selectedLocation = locations.find(
    (location) => String(location.id) === selectedLocationId
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {session && <AppDrawer />}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {selectedLocation ? selectedLocation.name : ""}
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.title || titleName || ""}
          </Typography>

          {session ? (
            <Button
              color="inherit"
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            >
              sign Out
            </Button>
          ) : (
            <span></span>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
