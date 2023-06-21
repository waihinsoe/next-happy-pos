import Layout from "@/components/Layout";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import type { locations as Location } from "@prisma/client";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import { config } from "@/config/config";
import DeleteDialog from "@/components/DeleteDialog";
import DeleteIcon from "@mui/icons-material/Delete";

const EditLocation = () => {
  const router = useRouter();
  const { locations, fetchData } = useContext(BackOfficeContext);
  const locationId = router.query.id as string;
  const [newLocation, setNewLocation] = useState<Partial<Location>>();
  const [open, setOpen] = useState(false);
  const updateLocation = async () => {
    if (!newLocation) return;
    const response = await fetch(`${config.backOfficeApiBaseUrl}/locations`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLocation),
    });
    if (response.ok) {
      fetchData();
    }
  };
  const handleDeleteLocation = async () => {
    const response = await fetch(
      `${config.backOfficeApiBaseUrl}/locations?locationId=${locationId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      fetchData();
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
    <Layout title="EditLocation">
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
            onClick={updateLocation}
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
    </Layout>
  );
};

export default EditLocation;