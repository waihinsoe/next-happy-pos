import Layout from "@/components/Layout";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import { Autocomplete, Box, Button, Checkbox, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { config } from "@/config/config";

const icon = (
  <CheckBoxOutlineBlankIcon fontSize="small" style={{ color: "lightblue" }} />
);
const checkedIcon = (
  <CheckBoxIcon fontSize="small" style={{ color: "green" }} />
);

const EditMenuCategory = () => {
  const router = useRouter();
  const menuCategoryId = router.query.id as string;
  const { menuCategories, menusMenuCategoriesLocations, locations } =
    useContext(BackOfficeContext);

  const menuCategory = menuCategories.find(
    (item) => item.id === Number(menuCategoryId)
  );

  const locationIds = [
    ...new Set(
      menusMenuCategoriesLocations
        .filter(
          (item) => menuCategory && item.menu_categories_id === menuCategory.id
        )
        .map((item) => item.locations_id)
    ),
  ];

  const selectedLocations = locations.filter((location) =>
    locationIds.includes(location.id)
  );

  const menuIds = menusMenuCategoriesLocations
    .filter((item) => item.menu_categories_id === Number(menuCategoryId))
    .map((item) => item.menus_id);

  const [newMenuCategory, setNewMenuCategory] = useState({
    id: menuCategory?.id,
    name: menuCategory?.name,
    locations: selectedLocations,
    menuIds,
  });

  useEffect(() => {
    if (menuCategory) {
      setNewMenuCategory({
        id: menuCategory.id,
        name: menuCategory.name,
        locations: selectedLocations,
        menuIds,
      });
    }
  }, [menuCategory]);

  const updateMenuCategory = async () => {
    const response = await fetch(
      `${config.backOfficeApiBaseUrl}/menuCategories`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMenuCategory),
      }
    );
  };
  if (!menuCategory) return null;

  return (
    <Layout title="EditMenuCategory">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 500,
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
          style={{ width: 500 }}
          renderInput={(params) => <TextField {...params} label="Locations" />}
        />
        <Button
          variant="contained"
          onClick={updateMenuCategory}
          sx={{ width: "fit-content", mt: 3 }}
        >
          Update
        </Button>
      </Box>
    </Layout>
  );
};

export default EditMenuCategory;
