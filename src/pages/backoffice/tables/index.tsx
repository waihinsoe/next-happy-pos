import Layout from "@/components/Layout";
import TableBarIcon from "@mui/icons-material/TableBar";

import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import { getSelectedLocationId } from "@/utils";
import { Box, Button } from "@mui/material";

import { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import NewTable from "./NewTable";
import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hook";
import { appData } from "@/store/slices/appSlice";

const Tables = () => {
  const { tables } = useAppSelector(appData);
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
              <ItemCard
                key={table.id}
                icon={
                  <TableBarIcon
                    sx={{ fontSize: "60px", mb: 1.5, color: "#1B9C85" }}
                  />
                }
                href={`/backoffice/tables/${table.id}`}
                title={table.name}
              />
            ))}
        </Box>
      </Box>
      <NewTable open={open} setOpen={setOpen} />
    </Layout>
  );
};

export default Tables;
