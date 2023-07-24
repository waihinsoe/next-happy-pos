import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { addAddon } from "@/store/slices/addonsSlice";
import { appData } from "@/store/slices/appSlice";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import type { addons as Addon } from "@prisma/client";
import { useState } from "react";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const NewAddon = ({ open, setOpen }: Props) => {
  const { addonCategories } = useAppSelector(appData);
  const dispatch = useAppDispatch();
  const [newAddon, setNewAddon] = useState({
    name: "",
    price: 0,
    addonCategoryId: "",
  });

  const createNewAddon = async () => {
    const { name, addonCategoryId } = newAddon;
    const isValid = name.length > 0 && addonCategoryId;

    if (!isValid) return alert("name and addonCategoryId are required!");

    const response = await fetch(`${config.apiBaseUrl}/addons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAddon),
    });
    if (response.ok) {
      const addonCreated = (await response.json()) as Addon;
      dispatch(addAddon(addonCreated));

      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle id="Addon-title" sx={{ textAlign: "center" }}>
        Create NewAddon
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: 400 }}
      >
        <TextField
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          onChange={(evt) =>
            setNewAddon({ ...newAddon, name: evt.target.value })
          }
        />

        <TextField
          margin="dense"
          id="price"
          label="price"
          type="number"
          fullWidth
          variant="outlined"
          onChange={(evt) =>
            setNewAddon({ ...newAddon, price: Number(evt.target.value) })
          }
        />

        <FormControl fullWidth>
          <InputLabel id="addonCategories">AddonCategories</InputLabel>
          <Select
            labelId="addonCategories"
            id="addonCategories"
            value={newAddon.addonCategoryId}
            onChange={(evt) => {
              setNewAddon({ ...newAddon, addonCategoryId: evt.target.value });
            }}
            input={<OutlinedInput label="AddonCategories" />}
            MenuProps={MenuProps}
          >
            {addonCategories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={createNewAddon}
          sx={{ width: "fit-content", margin: "0 auto" }}
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NewAddon;
