import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Button,
} from "@mui/material";
import { AppContext } from "../contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import { Company, Location } from "../typings/types";
import Layout from "./Layout";
import { config } from "../config/config";

const Settings = () => {
  const { locations, company } = useContext(AppContext);
  const accessToken = localStorage.getItem("accessToken");
  const [selectedLocation, setSelectedLocation] = useState<
    Location | undefined
  >();
  const [companyInfo, setCompanyInfo] = useState<Company>({
    name: "",
    address: "",
  });
  console.log(companyInfo.name, companyInfo.address);
  useEffect(() => {
    if (locations.length) {
      const selectedLocationId = localStorage.getItem("selectedLocation");
      if (!selectedLocationId) {
        localStorage.setItem("selectedLocation", String(locations[0].id));
        setSelectedLocation(locations[0]);
      } else {
        const selectedLocation = locations.find(
          (location) => String(location.id) === selectedLocationId
        );
        setSelectedLocation(selectedLocation);
      }
    }
    if (company) return setCompanyInfo(company);
  }, [locations, company]);
  const handleOnchange = (evt: SelectChangeEvent<number>) => {
    localStorage.setItem("selectedLocation", String(evt.target.value));
    const selectedLocation = locations.find(
      (location) => location.id === evt.target.value
    );
    setSelectedLocation(selectedLocation);
  };

  const updateCompany = async () => {
    const response = await fetch(
      `${config.apiBaseUrl}/settings/companies/${companyInfo.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(companyInfo),
      }
    );
    return response;
  };

  return (
    <Layout>
      <Box
        sx={{
          maxWidth: 400,
          margin: "0 auto",
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <TextField
          label="Company"
          variant="outlined"
          value={companyInfo.name}
          sx={{ mb: 2 }}
          onChange={(evt) => {
            const name = evt.target.value;
            setCompanyInfo({ ...companyInfo, name });
          }}
        />
        <TextField
          label="Address"
          variant="outlined"
          value={companyInfo.address}
          sx={{ mb: 2 }}
          onChange={(evt) =>
            setCompanyInfo({ ...companyInfo, address: evt.target.value })
          }
        />

        <FormControl fullWidth>
          <InputLabel id="location">location</InputLabel>
          <Select
            labelId="location"
            id="location"
            value={selectedLocation ? selectedLocation.id : ""}
            label="location"
            onChange={handleOnchange}
          >
            {locations.map((location) => (
              <MenuItem value={location.id} key={location.id}>
                {location.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={updateCompany}>
          Update
        </Button>
      </Box>
    </Layout>
  );
};

export default Settings;
