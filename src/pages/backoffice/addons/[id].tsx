import Layout from "@/components/Layout";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import type { addons as Addon } from "@prisma/client";
import { config } from "@/config/config";
import DeleteDialog from "@/components/DeleteDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { appData } from "@/store/slices/appSlice";
import { removeAddon, updateAddon } from "@/store/slices/addonsSlice";

const EditAddon = () => {
  const router = useRouter();
  const addonId = router.query.id as string;
  const { addons } = useAppSelector(appData);
  const dispatch = useAppDispatch();
  const [addon, setAddon] = useState<Addon>();
  const [open, setOpen] = useState(false);

  const handleUpdateAddon = async () => {
    const isValid = addon && addon.name;
    if (!isValid) return alert("Addon name is required.");
    const response = await fetch(`${config.apiBaseUrl}/addons`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addon),
    });

    if (response.ok) {
      const addonUpdated = (await response.json()) as Addon;
      dispatch(updateAddon(addonUpdated));
    }
  };

  const handleDeleteAddon = async () => {
    console.log("addonId", addonId);
    const response = await fetch(
      `${config.apiBaseUrl}/addons?addonId=${addonId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      addon && dispatch(removeAddon(addon));
      router.push("/backoffice/addons");
    }
  };

  useEffect(() => {
    if (addons.length) {
      const validAddon = addons.find((item) => item.id === Number(addonId));
      setAddon(validAddon);
    }
  }, [addons]);
  if (!addon) return null;
  return (
    <Layout title="EditAddon">
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          id="name"
          label="name"
          variant="outlined"
          value={addon.name}
          onChange={(evt) => setAddon({ ...addon, name: evt.target.value })}
          margin="dense"
        />
        <TextField
          id="address"
          label="address"
          variant="outlined"
          type="number"
          value={addon.price}
          onChange={(evt) =>
            setAddon({ ...addon, price: Number(evt.target.value) })
          }
        />
        <Button
          variant="contained"
          sx={{ width: "fit-content" }}
          onClick={handleUpdateAddon}
        >
          Update
        </Button>
      </Box>
      <DeleteDialog
        title="Are you sure you want to delete this addon?"
        open={open}
        setOpen={setOpen}
        callback={handleDeleteAddon}
      />
    </Layout>
  );
};

export default EditAddon;
