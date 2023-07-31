import BackofficeLayout from "@/components/BackofficeLayout";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import DeleteDialog from "@/components/DeleteDialog";
import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  removeAddonCategory,
  updateAddonCategory,
} from "@/store/slices/addonCategoriesSlice";
import { appData } from "@/store/slices/appSlice";
import type { addon_categories as AddonCategory } from "@prisma/client";

const EditAddonCategory = () => {
  const router = useRouter();
  const { addonCategories } = useAppSelector(appData);
  const dispatch = useAppDispatch();
  const addonCategoryId = router.query.id as string;
  const [openDialog, setOpenDialog] = useState(false);
  const [addonCategory, setAddonCategory] = useState<Partial<AddonCategory>>();

  const handleUpdateAddonCategory = async () => {
    const isValid = addonCategory && addonCategory.name;
    if (!isValid) return alert("name is required");

    const response = await fetch(`${config.apiBaseUrl}/addonCategories`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addonCategory),
    });

    if (response.ok) {
      const addonCategoryUpdated = (await response.json()) as AddonCategory;
      dispatch(updateAddonCategory(addonCategoryUpdated));
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
      const deleteAddonCategory = addonCategories.find(
        (item) => item.id === Number(addonCategoryId)
      );
      deleteAddonCategory && dispatch(removeAddonCategory(deleteAddonCategory));
      router.push("/backoffice/addonCategories");
    }
  };
  useEffect(() => {
    if (addonCategories.length) {
      const validAddonCategory = addonCategories.find(
        (item) => item.id === Number(addonCategoryId)
      );
      setAddonCategory(validAddonCategory);
    }
  }, [addonCategories]);

  if (!addonCategory) return null;
  return (
    <BackofficeLayout title="EditAddonCategory">
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
          value={addonCategory?.name}
          onChange={(evt) =>
            setAddonCategory({
              ...addonCategory,
              name: evt.target.value,
            })
          }
        />

        <FormControlLabel
          control={
            <Switch
              checked={addonCategory.is_required}
              onChange={() =>
                setAddonCategory({
                  ...addonCategory,
                  is_required: !addonCategory.is_required,
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
    </BackofficeLayout>
  );
};

export default EditAddonCategory;
