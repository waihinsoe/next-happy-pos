import BackofficeLayout from "@/components/BackofficeLayout";
import TableBarIcon from "@mui/icons-material/TableBar";
import { tables as Table } from "@prisma/client";
import { getSelectedLocationId, searching, sorting } from "@/utils";
import { Box, Button } from "@mui/material";

import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hook";
import { appData } from "@/store/slices/appSlice";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import NewTable from "./NewTable";
import SortingAndSearching from "@/components/SortingAndSearching";

const Tables = () => {
  const { tables } = useAppSelector(appData);
  const selectedLocationId = getSelectedLocationId() as string;
  const [open, setOpen] = useState(false);
  const [sortStatus, setSortStatus] = useState<string>("id");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const validTables = tables.filter(
    (table) => table.locations_id === Number(selectedLocationId)
  );
  const sortedTables = sorting(validTables, sortStatus);
  const searchedTables = searching(sortedTables, searchKeyword);
  return (
    <BackofficeLayout title="Tables">
      <Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            mb: 2,
          }}
        >
          <SortingAndSearching
            sortStatus={sortStatus}
            changeSortStatus={setSortStatus}
            searchKeyword={searchKeyword}
            changeSearchKeyword={setSearchKeyword}
          />
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
          {searchedTables.length > 0 &&
            searchedTables.map((table: Table) => (
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
    </BackofficeLayout>
  );
};

export default Tables;
