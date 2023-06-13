import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import logo from "../assets/main-logo.png";

interface Props {
  title?: string;
}
const TopBar = ({ title = "" }: Props) => {
  const { data } = useSession();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "#1B9C85" }}>
          {data ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ width: "80px", position: "relative" }}>
                <Image
                  src={logo}
                  alt="main-logo"
                  style={{ width: "100%", height: "100%" }}
                  priority
                />
              </Box>
              <Box>
                <Typography variant="h6">{title}</Typography>
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

export default TopBar;
