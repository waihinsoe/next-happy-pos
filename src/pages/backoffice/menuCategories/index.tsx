import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";

import Link from "next/link";

import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import Layout from "@/components/Layout";
import { MenuCategory } from "@/typings/types";
import { config } from "../../../config/config";
import { getSelectedLocationId } from "@/utils";
const MenuCategories = () => {
  const { menuCategories, menusMenuCategoriesLocations, fetchData } =
    useContext(BackOfficeContext);
  const [menuCategory, setMenuCategory] = useState<MenuCategory | null>(null);
  const selectedLocationId = getSelectedLocationId() as string;

  const validMenuCategoryIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === parseInt(selectedLocationId, 10))
    .map((item) => item.menu_categories_id);
  const filteredMenuCategories = menuCategories.filter(
    (item) => item.id && validMenuCategoryIds.includes(item.id)
  );

  const createMenuCategory = async () => {
    if (!menuCategory?.name) return alert("name is required");
    const response = await fetch(
      `${config.backOfficeApiBaseUrl}/menuCategories/?locationId=${selectedLocationId}`,
      {
        method: "POST",
        body: JSON.stringify(menuCategory),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      fetchData();
    }
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
  // if (menuCategories.length === 0) return;
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
        <Typography variant="h5">Create New MenuCategories</Typography>
        <TextField
          id="name"
          label="name"
          variant="outlined"
          onChange={(evt) =>
            setMenuCategory({
              name: evt.target.value,
            })
          }
        />

        <Button variant="contained" onClick={createMenuCategory}>
          Add menuCategory
        </Button>
      </Box>
      <Box
        sx={{
          maxWidth: "500px",
          margin: "auto",
          marginTop: "3rem",
        }}
      >
        {filteredMenuCategories.length > 0 &&
          filteredMenuCategories.map((menu) => (
            // <Link href={`/menu-categories/${menu.id}`} key={menu.id}>
            <Chip
              key={menu.id}
              label={menu.name}
              onClick={handleClick}
              onDelete={() => handleDelete(menu.id)}
            />
            // </Link>
          ))}
      </Box>
    </Layout>
  );
};

export default MenuCategories;
