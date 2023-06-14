import Layout from "@/components/Layout";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import { getSelectedLocationId } from "@/utils";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import NewAddon from "./NewAddon";

const Addons = () => {
  const [open, setOpen] = useState(false);
  const { addons, menusMenuCategoriesLocations, menusAddonCategories } =
    useContext(BackOfficeContext);
  const selectedLocationId = getSelectedLocationId() as string;

  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(selectedLocationId))
    .map((item) => item.menus_id);

  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => validMenuIds.includes(item.menus_id))
    .map((item) => item.addon_categories_id) as number[];

  const validAddons = addons.filter((item) =>
    validAddonCategoryIds.includes(item.addon_categories_id as number)
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
          <Link
            href={`/backoffice/addons/${addon.id}`}
            key={addon.id}
            style={{ textDecoration: "none", color: "black  " }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: 2,
                  border: "2px solid #EBEBEB",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                <Typography>{addon.price}</Typography>
              </Box>
              <Typography sx={{ mt: 1 }}>{addon.name}</Typography>
            </Box>
          </Link>
        ))}
      </Box>
      <NewAddon open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Addons;
