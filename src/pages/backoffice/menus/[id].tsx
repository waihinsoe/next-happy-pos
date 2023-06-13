import { useContext, useEffect, useState } from "react";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import type {
  menus as Menu,
  menu_categories as MenuCategory,
} from "@prisma/client";
import { config } from "../../../config/config";
import Layout from "../../../components/Layout";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import { useRouter } from "next/router";
import { getSelectedLocationId } from "@/utils";
const EditMenu = () => {
  const router = useRouter();
  const menuId = router.query.id as string;
  const {
    menus,
    menuCategories,
    menusMenuCategoriesLocations,
    menusAddonCategories,
    addonCategories,
    fetchData,
  } = useContext(BackOfficeContext);
  const selectedLocationId = getSelectedLocationId() as string;
  const menuCategoryIds = menusMenuCategoriesLocations
    .filter((item) => item.menus_id == parseInt(menuId, 10))
    .map((item) => item.menu_categories_id);

  let menu: Menu | undefined;
  if (menuId) {
    menu = menus.find((menu) => menu.id === parseInt(menuId, 10));
  }
  const selectedMenuCategories: MenuCategory[] = menuCategories.filter(
    (menuCategory) => menuCategoryIds.includes(menuCategory.id)
  );
  const [connectedMenuCategories, setConnectedMenuCategories] = useState(
    selectedMenuCategories
  );

  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => item.menus_id === Number(menuId))
    .map((item) => item.addon_categories_id);
  const selectedAddonCategories = addonCategories.filter((item) =>
    validAddonCategoryIds.includes(item.id)
  );

  const [connectedAddonCategories, setConnectedAddonCategories] = useState(
    selectedAddonCategories
  );

  const [newMenu, setNewMenu] = useState({
    id: menu?.id,
    name: menu?.name,
    price: menu?.price,
    menuCategoryIds,
    addonCategoryIds: validAddonCategoryIds,
    locationId: selectedLocationId,
  });

  useEffect(() => {
    if (menu) {
      setNewMenu({
        id: menu.id,
        name: menu.name,
        price: menu.price,
        menuCategoryIds,
        addonCategoryIds: validAddonCategoryIds,
        locationId: selectedLocationId,
      });
      setConnectedMenuCategories(selectedMenuCategories);
      setConnectedAddonCategories(selectedAddonCategories);
    }
  }, [menu]);

  const updateMenu = async () => {
    const { id, name, locationId } = newMenu;
    console.log(newMenu);
    const isValid = id && name && locationId;

    if (!isValid) return alert("Please fill required input fields");

    const response = await fetch(`${config.backOfficeApiBaseUrl}/menus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenu),
    });
    if (response.ok) {
      fetchData();
    }
  };
  if (!menu) return null;
  return (
    <Layout title="EditMenu">
      <Box>
        {menu ? (
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
              defaultValue={menu.name}
              onChange={(evt) => {
                setNewMenu({ ...newMenu, name: evt.target.value });
              }}
            />
            <TextField
              id="price"
              label="price"
              variant="outlined"
              defaultValue={menu.price}
              type="number"
              onChange={(evt) => {
                setNewMenu({ ...newMenu, price: parseInt(evt.target.value) });
              }}
            />
            <Autocomplete
              multiple
              limitTags={2}
              id="menuCategories"
              value={connectedMenuCategories}
              options={menuCategories}
              isOptionEqualToValue={(options, value) => options.id == value.id}
              getOptionLabel={(option) => option.name}
              onChange={(evt, values) => {
                const menuCategoryIds = values.map((item) => item.id);
                setNewMenu({ ...newMenu, menuCategoryIds });
                setConnectedMenuCategories(values);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="MenuCategories"
                  placeholder="Favorites"
                />
              )}
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
                setNewMenu({ ...newMenu, addonCategoryIds });
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

            <Button variant="contained" onClick={updateMenu}>
              Update
            </Button>
          </Box>
        ) : (
          <h1>menu not found</h1>
        )}
      </Box>
    </Layout>
  );
};

export default EditMenu;
