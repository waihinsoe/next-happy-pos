import CategoryIcon from "@mui/icons-material/Category";
import { Box, Button } from "@mui/material";
import { menu_categories as MenuCategory } from "@prisma/client";
import ItemCard from "@/components/ItemCard";
import BackofficeLayout from "@/components/BackofficeLayout";
import { useAppSelector } from "@/store/hook";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId, searching, sorting } from "@/utils";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import NewMenuCategory from "./NewMenuCategory";
import SortingAndSearching from "@/components/SortingAndSearching";

const MenuCategories = () => {
  const [sortStatus, setSortStatus] = useState<string>("id");
  const [searchKeyword, setSearchKeyword] = useState<string>("");

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

  const sortedMenuCategories = sorting(filteredMenuCategories, sortStatus);
  const searchedMenuCategories = searching(sortedMenuCategories, searchKeyword);

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

  return (
    <BackofficeLayout title="MenuCategories">
      <Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            mb: 2,
          }}
        >
          <SortingAndSearching
            sortStatus={sortStatus}
            changeSortStatus={setSortStatus}
            searchKeyword={searchKeyword}
            changeSearchKeyword={setSearchKeyword}
          />
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
          {searchedMenuCategories.length > 0 &&
            searchedMenuCategories.map((filteredMenuCategory: MenuCategory) => (
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
    </BackofficeLayout>
  );
};

export default MenuCategories;
