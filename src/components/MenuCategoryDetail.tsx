import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useParams } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { MenuCategory } from "../typings/types";
import { config } from "../config/config";
import Layout from "./Layout";

const MenuCategoryDetail = () => {
  const { menuCategories } = useContext(AppContext);
  const accessToken = localStorage.getItem("accessToken");
  const { menuCategoryId } = useParams();
  let menuCategory: MenuCategory | undefined;
  if (menuCategoryId) {
    menuCategory = menuCategories.find(
      (menu) => menu.id === parseInt(menuCategoryId, 10)
    );
  }
  const [newMenuCategory, setNewMenuCategory] = useState({
    name: "",
  });

  useEffect(() => {
    if (menuCategory) {
      setNewMenuCategory({ name: menuCategory?.name });
    }
  }, [menuCategory]);

  const updateMenuCategory = async () => {
    const response = await fetch(
      `${config.apiBaseUrl}/menu-categories/${menuCategory?.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newMenuCategory),
      }
    );
    console.log(await response.json());
  };
  return (
    <Layout>
      <Box>
        {menuCategory ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: 2,
              margin: "auto",
              maxWidth: "400px",
              mt: 2,
            }}
          >
            <TextField
              id="name"
              label="name"
              variant="outlined"
              defaultValue={menuCategory.name}
              onChange={(evt) => {
                setNewMenuCategory({ name: evt.target.value });
              }}
            />

            <Button variant="contained" onClick={updateMenuCategory}>
              Update
            </Button>
          </Box>
        ) : (
          <h1>menuCategories not found</h1>
        )}
      </Box>
    </Layout>
  );
};

export default MenuCategoryDetail;
