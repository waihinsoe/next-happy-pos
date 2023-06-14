import Layout from "@/components/Layout";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import { getSelectedLocationId } from "@/utils";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useContext, useState } from "react";
import NewAddonCategory from "./NewAddonCategory";
import AddIcon from "@mui/icons-material/Add";

const AddonCategories = () => {
  const [open, setOpen] = useState(false);
  const {
    fetchData,
    addons,
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations,
  } = useContext(BackOfficeContext);
  const selectedLocationId = getSelectedLocationId() as string;

  const menuIds = menusMenuCategoriesLocations
    .filter(
      (item) =>
        item.menus_id && item.locations_id === Number(selectedLocationId)
    )
    .map((item) => item.menus_id) as number[];

  const addonCategoryIds = menusAddonCategories
    .filter((item) => menuIds.includes(item.menus_id as number))
    .map((item) => item.addon_categories_id);

  const filteredAddonCategories = addonCategories.filter((item) =>
    addonCategoryIds.includes(item.id)
  );

  console.log(addonCategories);

  const getAddonCount = (addonCategoryId?: number) => {
    if (!addonCategoryId) return;
    return addons.filter((item) => item.addon_categories_id === addonCategoryId)
      .length;
  };

  return (
    <Layout title="AddonCategories">
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
          New Addon Category
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {filteredAddonCategories.map((addonCategory) => (
          <Link
            href={`/backoffice/addonCategories/${addonCategory.id}`}
            key={addonCategory.id}
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
                {getAddonCount(addonCategory.id)} Addons
              </Box>
              <Typography sx={{ mt: 1 }}>{addonCategory.name}</Typography>
            </Box>
          </Link>
        ))}
      </Box>
      <NewAddonCategory open={open} setOpen={setOpen} menuIds={menuIds} />
    </Layout>
  );
};

export default AddonCategories;
