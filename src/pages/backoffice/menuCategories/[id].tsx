import BackofficeLayout from "@/components/BackofficeLayout";
import MenuCard from "@/components/MenuCard";
import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { appData } from "@/store/slices/appSlice";
import {
  removeMenuCategory,
  updateMenuCategory,
} from "@/store/slices/menuCategoriesSlice";
import { fetchMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocationsSlice";
import {
  getLocationsByMenuCategoryId,
  getMenusByMenuCategoryId,
  getSelectedLocationId,
} from "@/utils";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";
import type { menu_categories as MenuCategory } from "@prisma/client";
import { menus as Menu } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DeleteDialog from "../../../components/DeleteDialog";
import RemoveMenuFromMenuCategory from "./RemoveMenuFromMenuCategory";
const icon = (
  <CheckBoxOutlineBlankIcon fontSize="small" style={{ color: "lightblue" }} />
);
const checkedIcon = (
  <CheckBoxIcon fontSize="small" style={{ color: "green" }} />
);

interface AutocompleteProps {
  id: number;
  label: string;
}

const EditMenuCategory = () => {
  const router = useRouter();
  const menuCategoryId = router.query.id as string;
  const selectedLocationId = getSelectedLocationId() as string;
  const { menus, menuCategories, menusMenuCategoriesLocations, locations } =
    useAppSelector(appData);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const menuCategory = menuCategories.find(
    (item) => item.id === Number(menuCategoryId)
  );

  const validMenus = getMenusByMenuCategoryId(
    menus,
    menusMenuCategoriesLocations,
    menuCategoryId,
    selectedLocationId
  );
  const validMenuIds = validMenus.map((item) => item.id);

  const selectedLocations = getLocationsByMenuCategoryId(
    locations,
    menusMenuCategoriesLocations,
    menuCategoryId
  );

  const [newMenuCategory, setNewMenuCategory] = useState({
    id: menuCategory?.id,
    name: menuCategory?.name,
    locations: selectedLocations,
  });

  const [selectedMenu, setSelectedMenu] = useState<AutocompleteProps | null>(
    null
  );
  const [selectedMenuToRemove, setSelectedMenuToRemove] = useState<Menu>();

  useEffect(() => {
    if (menuCategory) {
      setNewMenuCategory({
        id: menuCategory.id,
        name: menuCategory.name,
        locations: selectedLocations,
      });
    }
  }, [menuCategory, menusMenuCategoriesLocations]);

  const handleUpdateMenuCategory = async () => {
    const response = await fetch(`${config.apiBaseUrl}/menuCategories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenuCategory),
    });
    if (response.ok) {
      const menuCategoryUpdated = (await response.json()) as MenuCategory;
      dispatch(updateMenuCategory(menuCategoryUpdated));
      dispatch(fetchMenusMenuCategoriesLocations(locations));
    }
  };

  const addMenuToMenuCategory = async () => {
    const response = await fetch(
      `${config.apiBaseUrl}/menuCategories/addMenu`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          menuCategoryId,
          menuId: selectedMenu && selectedMenu.id,
          locationId: selectedLocationId,
        }),
      }
    );
    if (response.ok) {
      dispatch(fetchMenusMenuCategoriesLocations(locations));
      setSelectedMenu(null);
    }
  };

  const handleRemoveMenu = async (menu: Menu) => {
    if (!menu) return;
    console.log({
      menuId: menu.id,
      menuCategoryId,
      locationId: selectedLocationId,
    });
    const response = await fetch(
      `${config.apiBaseUrl}/menuCategories/removeMenu`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          menuId: menu.id,
          menuCategoryId,
          locationId: selectedLocationId,
        }),
      }
    );
    if (response.ok) {
      dispatch(fetchMenusMenuCategoriesLocations(locations));
      setOpen(false);
    }
  };

  const handleDeleteMenuCategory = async () => {
    const response = await fetch(
      `${config.apiBaseUrl}/menuCategories?menuCategoryId=${menuCategoryId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      menuCategory && dispatch(removeMenuCategory(menuCategory));
      dispatch(fetchMenusMenuCategoriesLocations(locations));
      router.push("/backoffice/menuCategories");
    }
  };
  if (!menuCategory) return null;

  return (
    <BackofficeLayout title="EditMenuCategory">
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Delete
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          defaultValue={menuCategory?.name}
          sx={{ mb: 2 }}
          onChange={(evt) =>
            setNewMenuCategory({ ...newMenuCategory, name: evt.target.value })
          }
        />
        <Autocomplete
          multiple
          options={locations}
          value={newMenuCategory.locations}
          disableCloseOnSelect
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          onChange={(evt, values) => {
            setNewMenuCategory({ ...newMenuCategory, locations: values });
          }}
          renderOption={(props, option) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={
                  newMenuCategory.locations.find(
                    (location) => location.id === option.id
                  )
                    ? true
                    : false
                }
              />
              {option.name}
            </li>
          )}
          renderInput={(params) => <TextField {...params} label="Locations" />}
        />
        <Button
          variant="contained"
          onClick={handleUpdateMenuCategory}
          sx={{ width: "fit-content", mt: 3 }}
        >
          Update
        </Button>
      </Box>
      <Box>
        <Typography variant="h4" sx={{ mt: 2 }}>
          Menus
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Autocomplete
            sx={{ minWidth: 300, mr: 3 }}
            value={selectedMenu}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(evt, value) => {
              setSelectedMenu(value);
            }}
            clearOnBlur
            options={menus
              .filter((item) => !validMenuIds.includes(item.id))
              .map((item) => ({ id: item.id, label: item.name }))}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Add menu to this category"
                InputProps={{
                  ...params.InputProps,
                }}
              />
            )}
          />
          <Button
            variant="contained"
            sx={{ width: "fit-content" }}
            onClick={addMenuToMenuCategory}
          >
            add
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            rowGap: 3,
            columnGap: 2,
            mt: 5,
          }}
        >
          {validMenus.map((menu) => (
            <Box
              key={menu.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
            >
              <MenuCard menu={menu} href={`/backoffice/menus/${menu.id}`} />
              <Button
                color="error"
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  setSelectedMenuToRemove(menu);
                  setOpen(true);
                }}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
      <RemoveMenuFromMenuCategory
        open={open}
        setOpen={setOpen}
        menu={selectedMenuToRemove}
        handleRemoveMenu={handleRemoveMenu}
      />
      <DeleteDialog
        title="Are you sure you want to delete this menu Category?"
        open={openDialog}
        setOpen={setOpenDialog}
        callback={handleDeleteMenuCategory}
      />
    </BackofficeLayout>
  );
};

export default EditMenuCategory;
