import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { MenuCategory } from "../typings/types";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import { Link } from "react-router-dom";
import Layout from "./Layout";
const MenuCategories = () => {
  const { menuCategories, fetchData } = useContext(AppContext);
  const accessToken = localStorage.getItem("accessToken");
  const [menuCategory, setMenuCategory] = useState<MenuCategory | null>(null);
  const createMenuCategory = async () => {
    if (!menuCategory?.name) throw new Error("hello");
    const response = await fetch(`${config.apiBaseUrl}/menu-categories`, {
      method: "POST",
      body: JSON.stringify(menuCategory),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      fetchData();
    }
  };

  const handleClick = () => {
    console.log("hello");
  };

  const handleDelete = async (menuCategoryId: number | undefined) => {
    const response = await fetch(
      `${config.apiBaseUrl}/menu-categories/${menuCategoryId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.ok) {
      fetchData();
    }
  };

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
        {menuCategories &&
          menuCategories.map((menu) => (
            <Link to={`/menu-categories/${menu.id}`} key={menu.id}>
              <Chip
                label={menu.name}
                onClick={handleClick}
                onDelete={() => handleDelete(menu.id)}
              />
            </Link>
          ))}
      </Box>
    </Layout>
  );
};

export default MenuCategories;
