import { useContext, useEffect } from "react";

import BackofficeLayout from "./BackofficeLayout";
import { Box, Typography } from "@mui/material";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("accessToken");
  }, []);
  return (
    <BackofficeLayout title="Logout">
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h3">You are logged out.</Typography>
      </Box>
    </BackofficeLayout>
  );
};

export default Logout;
