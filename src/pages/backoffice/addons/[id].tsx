import Layout from "@/components/Layout";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useContext } from "react";

const EditAddon = () => {
  const router = useRouter();
  const addonId = router.query.id as string;
  const { addons } = useContext(BackOfficeContext);
  const currentAddon = addons.find((item) => item.id === Number(addonId));
  return (
    <Layout title="EditAddon">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxWidth: 400,
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <TextField defaultValue={currentAddon?.name} />
        <TextField defaultValue={currentAddon?.price} type="number" />
        <Button
          variant="contained"
          sx={{ width: "fit-content", margin: "0 auto" }}
        >
          Update
        </Button>
      </Box>
    </Layout>
  );
};

export default EditAddon;
