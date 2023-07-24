import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { appData } from "@/store/slices/appSlice";
import { addLocation } from "@/store/slices/locationsSlice";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import type { locations as Location } from "@prisma/client";
import { useState } from "react";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewLocation = ({ open, setOpen }: Props) => {
  const { company } = useAppSelector(appData);
  const dispatch = useAppDispatch();
  const [newLocation, setNewLocation] = useState<Partial<Location>>();

  const createLocation = async () => {
    if (!newLocation || !company) return;
    const companyId = company.id;
    const { name, address } = newLocation;
    const isValid = name && address;
    if (!isValid) return alert("name and address are required.");

    const response = await fetch(
      `${config.apiBaseUrl}/locations?companyId=${companyId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLocation),
      }
    );
    if (response.ok) {
      const locationCreated = (await response.json()) as Location;
      dispatch(addLocation(locationCreated));
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle id="location" sx={{ textAlign: "center" }}>
        Add New Location
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            id="name"
            label="name"
            variant="outlined"
            onChange={(evt) =>
              setNewLocation({ ...newLocation, name: evt.target.value })
            }
            margin="dense"
          />
          <TextField
            id="address"
            label="address"
            variant="outlined"
            onChange={(evt) =>
              setNewLocation({ ...newLocation, address: evt.target.value })
            }
          />
          <Button
            variant="contained"
            sx={{ width: "fit-content", margin: "0 auto" }}
            onClick={createLocation}
          >
            Create
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default NewLocation;
