import DeleteDialog from "@/components/DeleteDialog";
import BackofficeLayout from "@/components/BackofficeLayout";
import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { appData } from "@/store/slices/appSlice";
import { removeLocation, updateLocation } from "@/store/slices/locationsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField } from "@mui/material";
import type { locations as Location } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditLocation = () => {
  const router = useRouter();
  const { locations } = useAppSelector(appData);
  const dispatch = useAppDispatch();
  const locationId = router.query.id as string;
  const [newLocation, setNewLocation] = useState<Partial<Location>>();
  const [open, setOpen] = useState(false);
  const handleUpdateLocation = async () => {
    if (!newLocation) return;
    const response = await fetch(`${config.apiBaseUrl}/locations`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLocation),
    });
    if (response.ok) {
      const locationUpdated = (await response.json()) as Location;
      dispatch(updateLocation(locationUpdated));
    }
  };
  const handleDeleteLocation = async () => {
    const response = await fetch(
      `${config.apiBaseUrl}/locations?locationId=${locationId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      const deleteLocation = locations.find(
        (item) => item.id === Number(locationId)
      );
      deleteLocation && dispatch(removeLocation(deleteLocation));
      router.push("/backoffice/locations");
    }
  };
  useEffect(() => {
    if (locations.length) {
      const validLocation = locations.find(
        (item) => item.id === Number(locationId)
      );
      setNewLocation(validLocation);
    }
  }, [locations]);
  if (!newLocation) return null;
  return (
    <BackofficeLayout title="EditLocation">
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
      <Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            id="name"
            label="name"
            variant="outlined"
            value={newLocation.name}
            onChange={(evt) =>
              setNewLocation({ ...newLocation, name: evt.target.value })
            }
            margin="dense"
          />
          <TextField
            id="address"
            label="address"
            variant="outlined"
            value={newLocation.address}
            onChange={(evt) =>
              setNewLocation({ ...newLocation, address: evt.target.value })
            }
          />
          <Button
            variant="contained"
            sx={{ width: "fit-content" }}
            onClick={handleUpdateLocation}
          >
            Update
          </Button>
        </Box>
      </Box>
      <DeleteDialog
        title="Are you sure you want to delete this location?"
        open={open}
        setOpen={setOpen}
        callback={handleDeleteLocation}
      />
    </BackofficeLayout>
  );
};

export default EditLocation;
