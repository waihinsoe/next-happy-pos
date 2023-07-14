import { useContext, useEffect, useState } from "react";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import type { menus as Menu } from "@prisma/client";
import { config } from "../../../config/config";
import Layout from "../../../components/Layout";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import { useRouter } from "next/router";
import { getAddonCategoriesByMenuId, getSelectedLocationId } from "@/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "../../../components/DeleteDialog";
import { useAppSelector } from "@/store/hook";
import { appData } from "@/store/slices/appSlice";

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
  const [menu, setMenu] = useState<Menu>();

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
      setMenu(validMenu);
      setConnectedAddonCategories(selectedAddonCategories);
    }
  }, [menus]);

  const updateMenu = async () => {
    const payload = { ...menu, addonCategoryIds };
    const response = await fetch(`${config.apiBaseUrl}/menus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      // fetchData();
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
      // fetchData();
      router.push("/backoffice/menus");
    }
  };
  if (!menu) return null;
  return (
    <Layout title="EditMenu">
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
        {menu ? (
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
              defaultValue={menu.name}
              onChange={(evt) => {
                setMenu({ ...menu, name: evt.target.value });
              }}
            />
            <TextField
              id="price"
              label="price"
              variant="outlined"
              defaultValue={menu.price}
              type="number"
              onChange={(evt) => {
                setMenu({ ...menu, price: parseInt(evt.target.value) });
              }}
            />

            <Autocomplete
              multiple
              limitTags={2}
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
              onClick={updateMenu}
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
    </Layout>
  );
};

export default EditMenu;
