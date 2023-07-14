import { Box, Button, Paper, Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";

import { useContext, useState } from "react";
import Link from "next/link";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import Layout from "@/components/Layout";
import AddIcon from "@mui/icons-material/Add";
import NewMenuCategory from "./NewMenuCategory";
import { getSelectedLocationId } from "@/utils";
import { config } from "@/config/config";
import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hook";
import { appData } from "@/store/slices/appSlice";

const MenuCategories = () => {
  const { menuCategories, menusMenuCategoriesLocations } =
    useAppSelector(appData);
  const [open, setOpen] = useState(false);
  const selectedLocationId = getSelectedLocationId() as string;

  const validMenuCategoryIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === parseInt(selectedLocationId, 10))
    .map((item) => item.menu_categories_id);

  const filteredMenuCategories = menuCategories.filter(
    (item) => item.id && validMenuCategoryIds.includes(item.id)
  );

  const getMenuCount = (menuCategoryId?: number) => {
    if (!menuCategoryId) return 0;
    return menusMenuCategoriesLocations.filter(
      (item) =>
        item.menus_id &&
        item.locations_id === Number(selectedLocationId) &&
        item.menu_categories_id === menuCategoryId
    ).length;
  };

  const handleClick = () => {
    console.log("hello");
  };

  const handleDelete = async (menuCategoryId: number | undefined) => {
    const response = await fetch(
      `${config.apiBaseUrl}/menuCategories/?menuCategoryId=${menuCategoryId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      // fetchData();
    }
  };
  return (
    <Layout title="MenuCategories">
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
                bgcolor: "#1B9C85", // theme.palette.primary.main
                color: "white",
              },
            }}
          >
            New Menu Category
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {filteredMenuCategories.length > 0 &&
            filteredMenuCategories.map((filteredMenuCategory) => (
              <ItemCard
                key={filteredMenuCategory.id}
                icon={
                  <CategoryIcon
                    sx={{ fontSize: "60px", mb: 1.5, color: "#1B9C85" }}
                  />
                }
                href={`/backoffice/menuCategories/${filteredMenuCategory.id}`}
                title={filteredMenuCategory.name}
                subtitle={`${getMenuCount(filteredMenuCategory.id)} menus`}
              />
            ))}
        </Box>
      </Box>
      <NewMenuCategory open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default MenuCategories;
