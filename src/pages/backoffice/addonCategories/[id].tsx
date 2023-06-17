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

  const selectedAddonCategory = addonCategories.find(
    (item) => item.id === Number(addonCategoryId)
  );

  const [newAddonCategory, setNewAddonCategory] = useState({
    name: "",
    isRequired: false,
  });

  useEffect(() => {
    if (selectedAddonCategory) {
      setNewAddonCategory({
        name: selectedAddonCategory.name,
        isRequired: selectedAddonCategory.is_required,
      });
    }
  }, [selectedAddonCategory]);
  if (!selectedAddonCategory) return null;
  const updateAddonCategory = () => {
    const { name, isRequired } = newAddonCategory;
    const isValid = name ? true : false;
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
          value={newAddonCategory?.name}
          onChange={(evt) =>
            setNewAddonCategory({ ...newAddonCategory, name: evt.target.value })
          }
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
