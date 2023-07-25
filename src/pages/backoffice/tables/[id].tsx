import DeleteDialog from "@/components/DeleteDialog";
import Layout from "@/components/Layout";
import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { appData } from "@/store/slices/appSlice";
import { removeTable, updateTable } from "@/store/slices/tablesSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, TextField } from "@mui/material";
import type { tables as Table } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditTable = () => {
  const router = useRouter();
  const { tables } = useAppSelector(appData);
  const dispatch = useAppDispatch();
  const tableId = router.query.id as string;
  const [newTable, setNewTable] = useState<Partial<Table>>();
  const [openDialog, setOpenDialog] = useState(false);
  const handleUpdateTable = async () => {
    if (!newTable) return alert("table name are required");
    const response = await fetch(`${config.apiBaseUrl}/tables`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTable),
    });

    if (response.ok) {
      const tableUpdated = (await response.json()) as Table;
      dispatch(updateTable(tableUpdated));
    }
  };

  const handleDeleteTable = async () => {
    if (!tableId) return;
    const response = await fetch(
      `${config.apiBaseUrl}/tables?tableId=${tableId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      const deleteTable = tables.find((item) => item.id === Number(tableId));
      deleteTable && dispatch(removeTable(deleteTable));
      router.push("/backoffice/tables");
    }
  };

  useEffect(() => {
    if (tables) {
      const validTable = tables.find((table) => table.id === Number(tableId));
      setNewTable(validTable);
    }
  }, [tables, tableId]);

  if (!newTable) return null;
  return (
    <Layout title="EditTable">
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Delete
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          defaultValue={newTable.name}
          onChange={(evt) =>
            setNewTable({ ...newTable, name: evt.target.value })
          }
        />
        <Button
          variant="contained"
          sx={{ width: "fit-content" }}
          onClick={handleUpdateTable}
        >
          Update
        </Button>
      </Box>
      <DeleteDialog
        title="Are you sure you want to delete this table?"
        open={openDialog}
        setOpen={setOpenDialog}
        callback={handleDeleteTable}
      />
    </Layout>
  );
};

export default EditTable;
