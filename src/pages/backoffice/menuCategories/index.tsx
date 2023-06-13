import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";

import Link from "next/link";

import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import Layout from "@/components/Layout";
import AddIcon from "@mui/icons-material/Add";

import NewMenuCategory from "./NewMenuCategory";
import { getSelectedLocationId } from "@/utils";
import { config } from "@/config/config";

const MenuCategories = () => {
  const { menuCategories, menusMenuCategoriesLocations, fetchData } =
    useContext(BackOfficeContext);
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
      `${config.backOfficeApiBaseUrl}/menuCategories/?menuCategoryId=${menuCategoryId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      fetchData();
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
              <Link
                href={`/backoffice/menuCategories/${filteredMenuCategory.id}`}
                key={filteredMenuCategory.id}
                style={{ textDecoration: "none", color: "#333333" }}
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
                    <Typography>
                      {getMenuCount(filteredMenuCategory.id)} Menus
                    </Typography>
                  </Box>
                  <Typography sx={{ mt: 1 }}>
                    {filteredMenuCategory.name}
                  </Typography>
                </Box>
              </Link>
            ))}
        </Box>
      </Box>
      <NewMenuCategory open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default MenuCategories;
