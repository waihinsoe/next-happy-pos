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

const EditAddonCategory = () => {
  const router = useRouter();
  const { fetchData, addonCategories } = useContext(BackOfficeContext);
  const addonCategoryId = router.query.id as string;
  const [openDialog, setOpenDialog] = useState(false);
  const [newAddonCategory, setNewAddonCategory] =
    useState<Partial<AddonCategory>>();

  const updateAddonCategory = async () => {
    const isValid = newAddonCategory && newAddonCategory.name;
    if (!isValid) return alert("name is required");

    const response = await fetch(
      `${config.backOfficeApiBaseUrl}/addonCategories`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAddonCategory),
      }
    );

    if (response.ok) {
      fetchData();
    }
  };

  const handleDeleteAddonCategory = async () => {
    const response = await fetch(
      `${config.backOfficeApiBaseUrl}/addonCategories?id=${addonCategoryId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      fetchData();
      router.push("/backoffice/addonCategories");
    }
  };
  useEffect(() => {
    if (addonCategories.length) {
      const validAddonCategory = addonCategories.find(
        (item) => item.id === Number(addonCategoryId)
      );
      setNewAddonCategory(validAddonCategory);
    }
  }, [addonCategories]);

  if (!newAddonCategory) return null;
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
          value={newAddonCategory?.name}
          onChange={(evt) =>
            setNewAddonCategory({ ...newAddonCategory, name: evt.target.value })
          }
        />

        <FormControlLabel
          control={
            <Switch
              checked={newAddonCategory.is_required}
              onChange={() =>
                setNewAddonCategory({
                  ...newAddonCategory,
                  is_required: !newAddonCategory.is_required,
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
