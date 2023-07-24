import { Box, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import Layout from "../../../components/Layout";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("accessToken");
  }, []);
  return (
    <Layout title="Logout">
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h3">You are logged out.</Typography>
      </Box>
    </Layout>
  );
};

export default Logout;
