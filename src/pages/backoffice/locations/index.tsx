import Layout from "@/components/Layout";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import { Box, Button, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import NewLocation from "./NewLocation";

const Locations = () => {
  const { locations } = useContext(BackOfficeContext);
  const [open, setOpen] = useState(false);
  return (
    <Layout title="Locations">
      <Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#4C4C6D",
              color: "#E8F6EF",
              width: "fit-content",
              ":hover": {
                bgcolor: "#1B9C85",
                color: "white",
              },
            }}
          >
            New Location
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {locations.length > 0 &&
            locations.map((location) => (
              <Link
                href={`/backoffice/locations/${location.id}`}
                key={location.id}
                style={{ textDecoration: "none", color: "#333333" }}
              >
                <Paper elevation={2}>
                  <Box
                    sx={{
                      width: 150,
                      height: 150,
                      borderRadius: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "flex-start",
                      cursor: "pointer",
                      p: 1,
                    }}
                  >
                    <Typography sx={{ color: "#4C4C6D", fontWeight: "700" }}>
                      {location.name}
                    </Typography>
                  </Box>
                </Paper>
              </Link>
            ))}
        </Box>
      </Box>
      <NewLocation open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Locations;
