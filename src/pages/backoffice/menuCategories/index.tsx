import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import Link from "next/link";

import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import Layout from "@/components/Layout";
// import { MenuCategory } from "@/typings/types";
import type {
  menu_categories as MenuCategory,
  locations as Location,
} from "@prisma/client";
import { config } from "../../../config/config";
import { getSelectedLocationId } from "@/utils";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const MenuCategories = () => {
  const { menuCategories, locations, menusMenuCategoriesLocations, fetchData } =
    useContext(BackOfficeContext);
  const [newMenuCategory, setNewMenuCategory] = useState({
    name: "",
    locationIds: [] as number[],
  });

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
    if (!newMenuCategory.name || !newMenuCategory.locationIds.length)
      return alert("Please enter menu name and select locations");

    const response = await fetch(
      `${config.backOfficeApiBaseUrl}/menuCategories/`,
      {
        method: "POST",
        body: JSON.stringify(newMenuCategory),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      fetchData();
      setOpen(false);
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
    <Layout title="MenuCategories">
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
              setNewMenuCategory({ ...newMenuCategory, name: evt.target.value })
            }
            sx={{ my: 2 }}
          />

          <FormControl>
            <InputLabel id="select-locations">locations</InputLabel>
            <Select
              labelId="select-locations"
              id="locations"
              multiple
              value={newMenuCategory.locationIds}
              onChange={(evt) => {
                const values = evt.target.value as number[];
                setNewMenuCategory({ ...newMenuCategory, locationIds: values });
              }}
              input={<OutlinedInput label="locations" />}
              renderValue={(values) => {
                const selectedLocations = newMenuCategory.locationIds.map(
                  (locationId) => {
                    return locations.find(
                      (location) => location.id === locationId
                    ) as Location;
                  }
                );
                return selectedLocations
                  .map((selectedLocation) => selectedLocation.name)
                  .join(", ");
              }}
              MenuProps={MenuProps}
            >
              {locations.map((location) => (
                <MenuItem key={location.id} value={location.id}>
                  <Checkbox
                    checked={
                      location.id &&
                      newMenuCategory.locationIds.includes(location.id)
                        ? true
                        : false
                    }
                  />
                  <ListItemText primary={location.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={() => {
              createMenuCategory();
            }}
            sx={{ width: "fit-content", alignSelf: "flex-end", mt: 2 }}
          >
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default MenuCategories;
