import Layout from "@/components/Layout";
import LunchDiningIcon from "@mui/icons-material/LunchDining";

import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import { getAddonsByLocationId, getSelectedLocationId } from "@/utils";
import { Box, Button, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import NewAddon from "./NewAddon";
import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hook";
import { appData } from "@/store/slices/appSlice";

const Addons = () => {
  const [open, setOpen] = useState(false);
  const { addons, menusMenuCategoriesLocations, menusAddonCategories } =
    useAppSelector(appData);

  const validAddons = getAddonsByLocationId(
    menusMenuCategoriesLocations,
    menusAddonCategories,
    addons
  );
  return (
    <Layout title="Addons">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
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
              bgcolor: "#1B9C85", // theme.palette.primary.main
              color: "white",
            },
          }}
        >
          New Addon
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {validAddons.map((addon) => (
          <ItemCard
            key={addon.id}
            href={`/backoffice/addons/${addon.id}`}
            title={addon.name}
            icon={
              <LunchDiningIcon
                sx={{ fontSize: "60px", mb: 1.5, color: "#1B9C85" }}
              />
            }
            subtitle={`${addon.price} kyat`}
          />
        ))}
      </Box>
      <NewAddon open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Addons;
