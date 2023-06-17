import Layout from "@/components/Layout";
import { config } from "@/config/config";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const EditTable = () => {
  const router = useRouter();
  const { tables, fetchData } = useContext(BackOfficeContext);
  const tableId = router.query.id as string;
  const tableName = tables.find((table) => table.id === Number(tableId));
  const [newTableName, setNewTableName] = useState(tableName?.name);

  const updateTable = async () => {
    if (!newTableName) return alert("table name are required");
    const response = await fetch(`${config.backOfficeApiBaseUrl}/tables`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tableId, name: newTableName }),
    });

    if (response.ok) {
      fetchData();
    }
  };
  return (
    <Layout title="EditTable">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          defaultValue={newTableName}
          onChange={(evt) => setNewTableName(evt.target.value)}
        />
        <Button
          variant="contained"
          sx={{ width: "fit-content" }}
          onClick={updateTable}
        >
          Update
        </Button>
      </Box>
    </Layout>
  );
};

export default EditTable;
