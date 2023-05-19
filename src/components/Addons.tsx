import { Box, Button, TextField } from "@mui/material";
import Layout from "./Layout";

const Addons = () => {
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px",
          margin: "auto",
          marginTop: "3rem",
          rowGap: "10px",
        }}
      >
        <h2>Create New Addons</h2>
        <TextField id="name" label="name" variant="outlined" />
        <TextField id="price" label="price" variant="outlined" />
        <Button variant="contained">Add addon</Button>
      </Box>
    </Layout>
  );
};

export default Addons;
