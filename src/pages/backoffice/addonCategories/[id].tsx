import Layout from "@/components/Layout";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import type { addon_categories as AddonCategory } from "@prisma/client";
import { config } from "@/config/config";
import DeleteDialog from "@/components/DeleteDialog";
import { useAppSelector } from "@/store/hook";
import { appData } from "@/store/slices/appSlice";

const EditAddonCategory = () => {
  const router = useRouter();
  const { addonCategories } = useAppSelector(appData);
  const addonCategoryId = router.query.id as string;
  const [openDialog, setOpenDialog] = useState(false);
  const [updateAddonCategory, setUpdateAddonCategory] =
    useState<Partial<AddonCategory>>();

  const handleUpdateAddonCategory = async () => {
    const isValid = updateAddonCategory && updateAddonCategory.name;
    if (!isValid) return alert("name is required");

    const response = await fetch(`${config.apiBaseUrl}/addonCategories`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateAddonCategory),
    });

    if (response.ok) {
      // fetchData();
    }
  };

  const handleDeleteAddonCategory = async () => {
    const response = await fetch(
      `${config.apiBaseUrl}/addonCategories?id=${addonCategoryId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      // fetchData();
      router.push("/backoffice/addonCategories");
    }
  };
  useEffect(() => {
    if (addonCategories.length) {
      const validAddonCategory = addonCategories.find(
        (item) => item.id === Number(addonCategoryId)
      );
      setUpdateAddonCategory(validAddonCategory);
    }
  }, [addonCategories]);

  if (!updateAddonCategory) return null;
  return (
    <Layout title="EditAddonCategory">
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
          maxWidth: 400,
          gap: 2,
          margin: "0 auto",
        }}
      >
        <TextField
          id="name"
          label="name"
          variant="outlined"
          value={updateAddonCategory?.name}
          onChange={(evt) =>
            setUpdateAddonCategory({
              ...updateAddonCategory,
              name: evt.target.value,
            })
          }
        />

        <FormControlLabel
          control={
            <Switch
              checked={updateAddonCategory.is_required}
              onChange={() =>
                setUpdateAddonCategory({
                  ...updateAddonCategory,
                  is_required: !updateAddonCategory.is_required,
                })
              }
            />
          }
          label="isRequired"
        />
        <Button variant="contained" onClick={handleUpdateAddonCategory}>
          Update
        </Button>
      </Box>
      <DeleteDialog
        title="Are you sure you want to delete this addon Category?"
        open={openDialog}
        setOpen={setOpenDialog}
        callback={handleDeleteAddonCategory}
      />
    </Layout>
  );
};

export default EditAddonCategory;
