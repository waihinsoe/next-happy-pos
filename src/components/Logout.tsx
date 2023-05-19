import { useContext, useEffect } from "react";
import { AppContext, defaultContext } from "../contexts/AppContext";
import Layout from "./Layout";
import { Box, Typography } from "@mui/material";

const Logout = () => {
  const { updateData } = useContext(AppContext);
  useEffect(() => {
    localStorage.removeItem("accessToken");
    updateData(defaultContext);
  }, []);
  return (
    <Layout>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h3">You are logged out.</Typography>
      </Box>
    </Layout>
  );
};

export default Logout;
