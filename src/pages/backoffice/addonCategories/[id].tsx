import Layout from "@/components/Layout";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import { getSelectedLocationId } from "@/utils";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
const icon = (
  <CheckBoxOutlineBlankIcon fontSize="small" style={{ color: "lightblue" }} />
);
const checkedIcon = (
  <CheckBoxIcon fontSize="small" style={{ color: "green" }} />
);
const EditAddonCategory = () => {
  const router = useRouter();
  const {
    fetchData,
    addonCategories,
    menusMenuCategoriesLocations,
    menusAddonCategories,
    menus,
  } = useContext(BackOfficeContext);
  const addonCategoryId = router.query.id as string;
  const selectedLocationId = getSelectedLocationId() as string;

  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.locations_id === Number(selectedLocationId))
    .map((item) => item.menus_id);
  const validMenus = menus.filter((item) => validMenuIds.includes(item.id));

  const selectedMenuIds = menusAddonCategories
    .filter((item) => item.addon_categories_id === Number(addonCategoryId))
    .map((item) => item.menus_id);
  const selectedMenus = menus.filter((item) =>
    selectedMenuIds.includes(item.id)
  );

  const selectedAddonCategory = addonCategories.find(
    (item) => item.id === Number(addonCategoryId)
  );

  const [newAddonCategory, setNewAddonCategory] = useState({
    name: "",
    isRequired: false,
    menuIds: [] as number[],
  });

  const [connectedMenus, setConnectedMenus] = useState(selectedMenus);
  useEffect(() => {
    if (selectedAddonCategory && selectedMenus) {
      setNewAddonCategory({
        name: selectedAddonCategory.name,
        isRequired: selectedAddonCategory.is_required,
        menuIds: selectedMenuIds as number[],
      });

      setConnectedMenus(selectedMenus);
    }
  }, [selectedAddonCategory]);

  const updateAddonCategory = () => {
    const { name, isRequired, menuIds } = newAddonCategory;
    const isValid = name.length > 0 && menuIds.length > 0;
    if (!isValid) return alert("name and menuIds are required");

    console.log(newAddonCategory);
  };

  if (!selectedAddonCategory) return null;
  return (
    <Layout title="EditAddonCategory">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 400,
          gap: 2,
          margin: "0 auto",
        }}
      >
        <TextField
          id="name"
          label="name"
          variant="outlined"
          value={newAddonCategory.name}
          onChange={(evt) =>
            setNewAddonCategory({ ...newAddonCategory, name: evt.target.value })
          }
        />
        <Autocomplete
          multiple
          options={validMenus}
          value={connectedMenus}
          disableCloseOnSelect
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          onChange={(evt, values) => {
            const menuIds = values.map((item) => item.id);
            setNewAddonCategory({ ...newAddonCategory, menuIds });
            setConnectedMenus(values);
          }}
          renderOption={(props, option) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={
                  connectedMenus.find((menu) => menu.id === option.id)
                    ? true
                    : false
                }
              />
              {option.name}
            </li>
          )}
          renderInput={(params) => <TextField {...params} label="menus" />}
        />
        <FormControlLabel
          control={
            <Switch
              checked={newAddonCategory.isRequired}
              onChange={() =>
                setNewAddonCategory({
                  ...newAddonCategory,
                  isRequired: !newAddonCategory.isRequired,
                })
              }
            />
          }
          label="isRequired"
        />
        <Button variant="contained" onClick={updateAddonCategory}>
          Update
        </Button>
      </Box>
    </Layout>
  );
};

export default EditAddonCategory;
