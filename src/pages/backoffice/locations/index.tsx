import Layout from "@/components/Layout";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import { Box, Button, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import NewLocation from "./NewLocation";
import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hook";
import { appData } from "@/store/slices/appSlice";

const Locations = () => {
  const { locations } = useAppSelector(appData);
  const [open, setOpen] = useState(false);
  return (
    <Layout title="Locations">
      <Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#4C4C6D",
              color: "#E8F6EF",
              width: "fit-content",
              ":hover": {
                bgcolor: "#1B9C85",
                color: "white",
              },
            }}
          >
            New Location
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {locations.length > 0 &&
            locations.map((location) => (
              <ItemCard
                key={location.id}
                icon={
                  <LocationOnIcon
                    sx={{ fontSize: "60px", mb: 1.5, color: "#1B9C85" }}
                  />
                }
                href={`/backoffice/locations/${location.id}`}
                title={location.name}
              />
            ))}
        </Box>
      </Box>
      <NewLocation open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Locations;
