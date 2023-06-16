import Layout from "@/components/Layout";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import { getSelectedLocationId } from "@/utils";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import NewTable from "./NewTable";

const Tables = () => {
  const { tables } = useContext(BackOfficeContext);
  const selectedLocationId = getSelectedLocationId() as string;
  const [open, setOpen] = useState(false);
  const validTables = tables.filter(
    (table) => table.locations_id === Number(selectedLocationId)
  );
  return (
    <Layout title="Tables">
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
                bgcolor: "#1B9C85", // theme.palette.primary.main
                color: "white",
              },
            }}
          >
            New Table
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {validTables.length > 0 &&
            validTables.map((table) => (
              <Link
                href={`/backoffice/tables/${table.id}`}
                key={table.id}
                style={{ textDecoration: "none", color: "#333333" }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      width: 150,
                      height: 150,
                      borderRadius: 2,
                      border: "2px solid #EBEBEB",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <Typography>{table.name}</Typography>
                  </Box>
                </Box>
              </Link>
            ))}
        </Box>
      </Box>
      <NewTable open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Tables;
