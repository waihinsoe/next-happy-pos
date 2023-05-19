import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "./Layout";
import { Location, Menu } from "../typings/types";
import { useContext, useState } from "react";
import FileDropzone from "./FileDropZone";
import { config } from "../config/config";
import { AppContext } from "../contexts/AppContext";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";

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

const CreateMenu = () => {
  const navigate = useNavigate();
  const { locations, fetchData } = useContext(AppContext);
  const accessToken = localStorage.getItem("accessToken");
  const [selectedLocationIds, setSelectedLocationIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [menuImage, setMenuImage] = useState<File>();
  const [menu, setMenu] = useState<Menu>({
    name: "",
    price: 0,
    description: "",
    locationIds: [],
    isAvailable: true,
  });
  const isDisable =
    !menu.name || !menu.description || !(menu.locationIds.length > 0);
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
        const response = await fetch(`${config.apiBaseUrl}/assets`, {
          method: "POST",
          body: formData,
        });
        const responseJson = await response.json();
        const assetUrl = responseJson.assetUrl;
        menu.asset_url = assetUrl;
      }
      const response = await fetch(`${config.apiBaseUrl}/menus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(menu),
      });

      if (response.ok) {
        navigate("/menus");
        fetchData();
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  // const deleteMenu = async (menuId?: number) => {
  //   if (!menuId) return;
  //   const response = await fetch(`${config.apiBaseUrl}/menus/${menuId}`, {
  //     method: "DELETE",
  //   });
  // };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: 400,
          margin: "0 auto",

          rowGap: 1,
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center", mt: 1 }}>
          Create New Menu
        </Typography>
        <TextField
          label="Name"
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
          <InputLabel id="select-location">location</InputLabel>
          <Select
            labelId="select-location"
            id="locations"
            multiple
            value={selectedLocationIds}
            onChange={(evt) => {
              const values = evt.target.value as number[];
              setSelectedLocationIds(values);
              setMenu({ ...menu, locationIds: values });
            }}
            input={<OutlinedInput label="location" />}
            renderValue={() => {
              const selectedLocations = selectedLocationIds.map(
                (selectedLocationId) => {
                  return locations.find(
                    (location) => location.id === selectedLocationId
                  ) as Location;
                }
              );
              return selectedLocations
                .map((selectedLocation) => selectedLocation.name)
                .join(", ");
            }}
            MenuProps={MenuProps}
          >
            {locations.map((location) => (
              <MenuItem key={location.id} value={location.id}>
                <Checkbox
                  checked={
                    location.id && selectedLocationIds.includes(location.id)
                      ? true
                      : false
                  }
                />
                <ListItemText primary={location.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box>
          <FileDropzone onFileSelected={onFileSelected} />
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
        >
          Create Menu
        </LoadingButton>
      </Box>
    </Layout>
  );
};

export default CreateMenu;
