import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";
import { useState } from "react";

import type {
  locations as Location,
  menu_categories as MenuCategory,
} from "@prisma/client";
import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { appData } from "@/store/slices/appSlice";
import { addMenuCategory } from "@/store/slices/menuCategoriesSlice";
import { fetchMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocationsSlice";
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

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewMenuCategory = ({ open, setOpen }: Props) => {
  const { locations } = useAppSelector(appData);
  const dispatch = useAppDispatch();
  const [newMenuCategory, setNewMenuCategory] = useState({
    name: "",
    locationIds: [] as number[],
  });

  const createMenuCategory = async () => {
    if (!newMenuCategory.name || !newMenuCategory.locationIds.length)
      return alert("Please enter menu name and select locations");

    const response = await fetch(`${config.apiBaseUrl}/menuCategories/`, {
      method: "POST",
      body: JSON.stringify(newMenuCategory),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const menuCategory = (await response.json()) as MenuCategory;
      dispatch(addMenuCategory(menuCategory));
      dispatch(fetchMenusMenuCategoriesLocations(locations));
      setOpen(false);
    }
  };
  return (
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
  );
};

export default NewMenuCategory;
