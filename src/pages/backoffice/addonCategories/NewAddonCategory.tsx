import { config } from "@/config/config";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useContext, useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  menuIds?: number[];
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

const NewAddonCategory = ({ open, setOpen, menuIds }: Props) => {
  const { menus, fetchData } = useContext(BackOfficeContext);
  const [newAddonCategory, setNewAddonCategory] = useState({
    name: "",
    isRequired: false,
    menuIds: [] as number[],
  });

  const currentMenus = menus.filter((item) => menuIds?.includes(item.id));

  const createNewAddonCategory = async () => {
    const { name, menuIds } = newAddonCategory;
    const isValid = name.length > 0 && menuIds.length > 0;
    if (!isValid) return alert("name and menus are required!");

    const response = await fetch(
      `${config.backOfficeApiBaseUrl}/addonCategories`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAddonCategory),
      }
    );
    if (response.ok) {
      setOpen(false);
      fetchData();
    }
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle id="AddonCategory-title" sx={{ textAlign: "center" }}>
        Create NewAddonCategory
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
            setNewAddonCategory({ ...newAddonCategory, name: evt.target.value })
          }
        />

        <FormControl fullWidth>
          <InputLabel id="menus">Menus</InputLabel>
          <Select
            labelId="menus"
            id="menus"
            multiple
            value={newAddonCategory.menuIds}
            onChange={(evt) => {
              const values = evt.target.value as number[];
              setNewAddonCategory({ ...newAddonCategory, menuIds: values });
            }}
            input={<OutlinedInput label="menus" />}
            renderValue={(values) => {
              const selectedMenus = menus
                .filter((item) => values.includes(item.id))
                .map((item) => item.name);

              return selectedMenus.join(", ");
            }}
            MenuProps={MenuProps}
          >
            {currentMenus.map((menu) => (
              <MenuItem key={menu.id} value={menu.id}>
                <Checkbox
                  checked={
                    newAddonCategory.menuIds.includes(menu.id) ? true : false
                  }
                />
                <ListItemText primary={menu.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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

        <Button
          variant="contained"
          onClick={createNewAddonCategory}
          sx={{ width: "fit-content", margin: "0 auto" }}
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NewAddonCategory;
