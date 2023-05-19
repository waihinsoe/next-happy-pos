import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import Layout from "./Layout";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Location } from "../typings/types";
import { config } from "../config/config";

const Locations = () => {
  const accessToken = localStorage.getItem("accessToken");
  const { locations, company, fetchData } = useContext(AppContext);
  const [newLocation, setNewLocation] = useState({ name: "", address: "" });
  const [updatedLocations, setUpdatedLocations] =
    useState<Location[]>(locations);

  useEffect(() => {
    setUpdatedLocations(locations);
  }, [locations]);
  const updateLocation = async (location: Location) => {
    const locationId = location.id;
    const oldLocation = locations.find(
      (location) => location.id === locationId
    );
    const newLocation = updatedLocations.find(
      (updatedLocation) => updatedLocation.id === locationId
    );

    if (
      oldLocation?.name !== newLocation?.name ||
      oldLocation?.address !== newLocation?.address
    ) {
      const response = await fetch(`${config.apiBaseUrl}/locations/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newLocation),
      });
      return response;
    }
  };

  const createLocation = async () => {
    const isValid =
      newLocation.name.length > 0 &&
      newLocation.address.length > 0 &&
      company?.id;
    if (!isValid) return console.log("name and address are both requied.");
    const response = await fetch(
      `${config.apiBaseUrl}/locations/${company?.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newLocation),
      }
    );
    if (response.ok) {
      fetchData();
    }
  };

  const deleteLocation = async (currentLocationId: number | undefined) => {
    if (!currentLocationId) return console.log("locationId is required.");

    const response = await fetch(
      `${config.apiBaseUrl}/locations/${currentLocationId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "appliation/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.ok) {
      fetchData();
    }
    alert(
      "cannot delete this location. Please delete menus associated with it first."
    );
  };
  return (
    <Layout>
      <Box sx={{ mt: 2, px: 2 }}>
        {updatedLocations.length > 0 &&
          updatedLocations.map((location, index) => {
            return (
              <Box
                key={location.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: 2,
                  mb: 2,
                }}
              >
                <Typography variant="h4">{index + 1}.</Typography>
                <TextField
                  id="name"
                  variant="outlined"
                  value={location.name}
                  placeholder="name"
                  onChange={(evt) => {
                    const newLocations = updatedLocations.map(
                      (updatedLocation) => {
                        if (updatedLocation.id === location.id) {
                          return { ...updatedLocation, name: evt.target.value };
                        }
                        return updatedLocation;
                      }
                    );
                    setUpdatedLocations(newLocations);
                  }}
                />
                <TextField
                  id="address"
                  placeholder="address"
                  variant="outlined"
                  value={location.address}
                  sx={{ minWidth: 300 }}
                  onChange={(evt) => {
                    const newLocations = updatedLocations.map(
                      (updatedLocation) => {
                        if (updatedLocation.id === location.id) {
                          return {
                            ...updatedLocation,
                            address: evt.target.value,
                          };
                        }
                        return updatedLocation;
                      }
                    );
                    setUpdatedLocations(newLocations);
                  }}
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteLocation(location.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  onClick={() => updateLocation(location)}
                >
                  Update
                </Button>
              </Box>
            );
          })}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            columnGap: 2,
            mb: 2,
            pl: 5.5,
          }}
        >
          <TextField
            id="name"
            variant="outlined"
            placeholder="name"
            onChange={(evt) =>
              setNewLocation({ ...newLocation, name: evt.target.value })
            }
          />
          <TextField
            id="address"
            placeholder="address"
            variant="outlined"
            sx={{ minWidth: 300 }}
            onChange={(evt) =>
              setNewLocation({ ...newLocation, address: evt.target.value })
            }
          />
          <Button variant="contained" onClick={createLocation}>
            Create
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default Locations;
