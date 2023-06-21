import Layout from "@/components/Layout";
import { config } from "@/config/config";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import type { tables as Table } from "@prisma/client";
import DeleteDialog from "@/components/DeleteDialog";
import DeleteIcon from "@mui/icons-material/Delete";

const EditTable = () => {
  const router = useRouter();
  const { tables, fetchData } = useContext(BackOfficeContext);
  const tableId = router.query.id as string;
  const [newTable, setNewTable] = useState<Partial<Table>>();
  const [openDialog, setOpenDialog] = useState(false);
  const updateTable = async () => {
    if (!newTable) return alert("table name are required");
    const response = await fetch(`${config.backOfficeApiBaseUrl}/tables`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTable),
    });

    if (response.ok) {
      fetchData();
    }
  };

  const handleDeleteTable = async () => {
    if (!tableId) return;
    const response = await fetch(
      `${config.backOfficeApiBaseUrl}/tables?tableId=${tableId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      fetchData();
      router.push("/backoffice/tables");
    }
  };

  useEffect(() => {
    if (tables) {
      const validTable = tables.find((table) => table.id === Number(tableId));
      setNewTable(validTable);
    }
  }, [tables]);

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
          onClick={updateTable}
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
