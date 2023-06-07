import { useContext, useEffect } from "react";
import {
  BackOfficeContext,
  defaultBackOfficeContext,
} from "../../../contexts/BackOfficeContext";
import Layout from "../../../components/Layout";
import { Box, Typography } from "@mui/material";

const Logout = () => {
  const { updateData } = useContext(BackOfficeContext);
  useEffect(() => {
    localStorage.removeItem("accessToken");
    updateData(defaultBackOfficeContext);
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
