import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

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
        item.menus_id !== null && item.menu_categories_id === menuCategoryId
    ).length;
  };

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
  return (
    <Layout>
      <Box>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Box
            onClick={() => setOpen(true)}
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
            <AddCircleOutlineIcon color="info" sx={{ fontSize: "50px" }} />
          </Box>
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
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        sx={{ textAlign: "center" }}
      >
        <DialogTitle>Create new menu category</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 300,
            minHeight: 150,
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(evt) =>
              setMenuCategory({ ...menuCategory, name: evt.target.value })
            }
            sx={{ my: 2 }}
          />
          <Button
            variant="contained"
            onClick={() => {
              createMenuCategory();
              setOpen(false);
            }}
            sx={{ width: "fit-content", alignSelf: "flex-end" }}
          >
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default MenuCategories;
