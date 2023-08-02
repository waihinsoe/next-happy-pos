import BackofficeLayout from "@/components/BackofficeLayout";
import ClassIcon from "@mui/icons-material/Class";

import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hook";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import NewAddonCategory from "./NewAddonCategory";
import { RootState } from "@/store";
import Loading from "@/components/Loading";

const AddonCategories = () => {
  const [open, setOpen] = useState(false);
  const {
    addons,
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations,
  } = useAppSelector(appData);
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

  const getAddonCount = (addonCategoryId?: number) => {
    if (!addonCategoryId) return;
    return addons.filter((item) => item.addon_categories_id === addonCategoryId)
      .length;
  };

  return (
    <BackofficeLayout title="AddonCategories">
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
          <ItemCard
            key={addonCategory.id}
            icon={
              <ClassIcon sx={{ fontSize: "60px", mb: 1.5, color: "#1B9C85" }} />
            }
            href={`/backoffice/addonCategories/${addonCategory.id}`}
            title={addonCategory.name}
            subtitle={`${getAddonCount(addonCategory.id)} adddons`}
          />
        ))}
      </Box>
      <NewAddonCategory open={open} setOpen={setOpen} menuIds={menuIds} />
    </BackofficeLayout>
  );
};

export default AddonCategories;
