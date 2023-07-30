import { useEffect, useState } from "react";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import type { menus as Menu } from "@prisma/client";
import { config } from "../../../config/config";
import BackofficeLayout from "../../../components/BackofficeLayout";
import { useRouter } from "next/router";
import { getAddonCategoriesByMenuId, getSelectedLocationId } from "@/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../../../components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { appData } from "@/store/slices/appSlice";
import { removeMenu, updateMenu } from "@/store/slices/menusSlice";
import { fetchMenusAddonCategories } from "@/store/slices/menusAddonCategoriesSlice";

interface AutocompleteProps {
  id: number;
  label: string;
}

const EditMenu = () => {
  const router = useRouter();
  const menuId = router.query.id as string;
  const [open, setOpen] = useState(false);
  const selectedLocationId = getSelectedLocationId() as string;
  const { menus, menusAddonCategories, addonCategories } =
    useAppSelector(appData);
  const dispatch = useAppDispatch();
  const [menuToUpdate, setMenuToUpdate] = useState<Menu>();

  const selectedAddonCategories = getAddonCategoriesByMenuId(
    menusAddonCategories,
    menuId,
    addonCategories
  );
  const [connectedAddonCategories, setConnectedAddonCategories] = useState(
    selectedAddonCategories
  );
  const [addonCategoryIds, setAddonCategoryIds] = useState<Number[]>();

  useEffect(() => {
    if (menus.length) {
      const validMenu = menus.find((menu) => menu.id === parseInt(menuId, 10));
      setMenuToUpdate(validMenu);
      setConnectedAddonCategories(selectedAddonCategories);
    }
  }, [menus, menusAddonCategories, selectedAddonCategories, menuId]);

  const handleUpdateMenu = async () => {
    const payload = { ...menuToUpdate, addonCategoryIds };
    const response = await fetch(`${config.apiBaseUrl}/menus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const menuUpdated = (await response.json()) as Menu;
      dispatch(updateMenu(menuUpdated));
      dispatch(fetchMenusAddonCategories(menus));
    }
  };

  const handleDeleteMenu = async () => {
    if (!menuId) return alert("MenuId is required");
    const response = await fetch(
      `${config.apiBaseUrl}/menus?menuId=${menuId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      menuToUpdate && dispatch(removeMenu(menuToUpdate));
      router.push("/backoffice/menus");
    }
  };
  if (!menuToUpdate) return null;
  return (
    <BackofficeLayout title="EditMenu">
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => setOpen(true)}
        >
          Delete
        </Button>
      </Box>
      <Box>
        {menuToUpdate ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: 2,
              margin: "auto",
              mt: 2,
            }}
          >
            <TextField
              id="name"
              label="name"
              variant="outlined"
              defaultValue={menuToUpdate.name}
              onChange={(evt) => {
                setMenuToUpdate({ ...menuToUpdate, name: evt.target.value });
              }}
            />
            <TextField
              id="price"
              label="price"
              variant="outlined"
              defaultValue={menuToUpdate.price}
              type="number"
              onChange={(evt) => {
                setMenuToUpdate({
                  ...menuToUpdate,
                  price: parseInt(evt.target.value),
                });
              }}
            />

            <Autocomplete
              multiple
              id="menuCategories"
              value={connectedAddonCategories}
              options={addonCategories}
              isOptionEqualToValue={(options, value) => options.id == value.id}
              getOptionLabel={(option) => option.name}
              onChange={(evt, values) => {
                const addonCategoryIds = values.map((item) => item.id);
                setAddonCategoryIds(addonCategoryIds);
                setConnectedAddonCategories(values);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="AddonCategories"
                  placeholder="Favorites"
                />
              )}
            />

            <Button
              variant="contained"
              onClick={handleUpdateMenu}
              sx={{ width: "fit-content" }}
            >
              Update
            </Button>
          </Box>
        ) : (
          <h1>menu not found</h1>
        )}
      </Box>
      <DeleteDialog
        title="Are you sure you want to delete this menu?"
        open={open}
        setOpen={setOpen}
        callback={handleDeleteMenu}
      />
    </BackofficeLayout>
  );
};

export default EditMenu;
