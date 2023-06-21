import {
  Box,
  Button,
  Checkbox,
  Chip,
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
  Typography,
} from "@mui/material";
import Layout from "@/components/Layout";
import type {
  locations as Location,
  menus as Menu,
  menu_categories as MenuCategory,
} from "@prisma/client";
import { useContext, useState } from "react";
import FileDropZone from "@/components/FileDropZone";
import { config } from "@/config/config";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import LoadingButton from "@mui/lab/LoadingButton";
import { getSelectedLocationId } from "@/utils";

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

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewMenu = ({ open, setOpen }: Props) => {
  const selectedLocationId = getSelectedLocationId() as string;
  const { fetchData, menusMenuCategoriesLocations, menuCategories } =
    useContext(BackOfficeContext);
  const [selectedMenuCategoryIds, setSelectedMenuCategoryIds] = useState<
    number[]
  >([]);

  const validMenuCategoryIds = menusMenuCategoriesLocations
    .filter(
      (item) =>
        item.menu_categories_id &&
        item.locations_id === Number(selectedLocationId)
    )
    .map((item) => item.menu_categories_id);

  const filteredMenuCategories = menuCategories.filter(
    (item) => item.id && validMenuCategoryIds.includes(item.id)
  );

  const [isLoading, setIsLoading] = useState(false);
  const [menuImage, setMenuImage] = useState<File>();
  const [menu, setMenu] = useState({
    name: "",
    price: 0,
    description: "",
    menuCategoryIds: [] as number[],
    asset_url: "",
    isAvailable: true,
  });
  const isDisable =
    !menu.name || !menu.description || !(menu.menuCategoryIds.length > 0);
  const onFileSelected = (files: File[]) => {
    setMenuImage(files[0]);
  };

  const createMenu = async () => {
    if (!menu.name) return console.log("Please enter your name");

    setIsLoading(true);
    try {
      if (menuImage) {
        const formData = new FormData();
        formData.append("files", menuImage as Blob);
        const response = await fetch(`${config.backOfficeApiBaseUrl}/assets`, {
          method: "POST",
          body: formData,
        });
        const responseJson = await response.json();
        const assetUrl = responseJson.assetUrl;
        menu.asset_url = assetUrl;
      }
      const response = await fetch(
        `${config.backOfficeApiBaseUrl}/menus?locationId=${selectedLocationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(menu),
        }
      );

      if (response.ok) {
        setMenu({
          name: "",
          price: 0,
          description: "",
          menuCategoryIds: [] as number[],
          asset_url: "",
          isAvailable: true,
        });
        setSelectedMenuCategoryIds([]);
        fetchData();
      }

      setIsLoading(false);
      setOpen(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center" }}>Create New Menu</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: 300,
            rowGap: 1,
          }}
        >
          <TextField
            label="Name"
            margin="dense"
            variant="outlined"
            onChange={(evt) => setMenu({ ...menu, name: evt.target.value })}
          />
          <TextField
            label="Price"
            variant="outlined"
            type="number"
            onChange={(evt) =>
              setMenu({ ...menu, price: parseInt(evt.target.value, 10) })
            }
          />
          <TextField
            label="description"
            variant="outlined"
            onChange={(evt) =>
              setMenu({ ...menu, description: evt.target.value })
            }
          />
          <FormControl>
            <InputLabel id="select-menuCategory">Menu-Categories</InputLabel>
            <Select
              labelId="select-menuCategories"
              id="menuCategory"
              multiple
              value={selectedMenuCategoryIds}
              onChange={(evt) => {
                const values = evt.target.value as number[];
                setSelectedMenuCategoryIds(values);
                setMenu({ ...menu, menuCategoryIds: values });
              }}
              input={<OutlinedInput label="menuCategories" />}
              renderValue={() => {
                const selectedMenuCategories = selectedMenuCategoryIds.map(
                  (selectedMenuCategoryId) => {
                    return menuCategories.find(
                      (menuCategory) =>
                        menuCategory.id === selectedMenuCategoryId
                    ) as MenuCategory;
                  }
                );
                return selectedMenuCategories
                  .map((selectedMenuCategory) => selectedMenuCategory.name)
                  .join(", ");
              }}
              MenuProps={MenuProps}
            >
              {filteredMenuCategories.map((menuCategory) => (
                <MenuItem key={menuCategory.id} value={menuCategory.id}>
                  <Checkbox
                    checked={
                      menuCategory.id &&
                      selectedMenuCategoryIds.includes(menuCategory.id)
                        ? true
                        : false
                    }
                  />
                  <ListItemText primary={menuCategory.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box>
            <FileDropZone onFileSelected={onFileSelected} />
            {menuImage && (
              <Chip
                sx={{ mt: 1 }}
                label={menuImage.name}
                onDelete={() => setMenuImage(undefined)}
              />
            )}
          </Box>
          <LoadingButton
            loading={isLoading}
            onClick={createMenu}
            disabled={isDisable}
            variant="contained"
            sx={{ width: "fit-content", margin: "0 auto", mt: 2 }}
          >
            Create Menu
          </LoadingButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default NewMenu;
