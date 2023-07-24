import { config } from "@/config/config";
import { useAppDispatch } from "@/store/hook";
import { addTable } from "@/store/slices/tablesSlice";
import { getSelectedLocationId } from "@/utils";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import type { tables as Table } from "@prisma/client";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewTable = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const selectedLocationId = getSelectedLocationId() as string;
  const [newTable, setNewTable] = useState({
    name: "",
    locationId: selectedLocationId,
  });

  const createTable = async () => {
    const { name, locationId } = newTable;
    const isValid = name && locationId;
    if (!isValid) return alert("Please enter table name");

    const response = await fetch(`${config.apiBaseUrl}/tables/`, {
      method: "POST",
      body: JSON.stringify(newTable),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const tableCreated = (await response.json()) as Table;
      dispatch(addTable(tableCreated));
      setNewTable({ ...newTable, name: "" });
      setOpen(false);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      sx={{ textAlign: "center" }}
    >
      <DialogTitle>Create new table</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          minWidth: 300,
          minHeight: 150,
        }}
      >
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          onChange={(evt) =>
            setNewTable({ ...newTable, name: evt.target.value })
          }
          sx={{ my: 2 }}
        />
        <Button
          variant="contained"
          onClick={createTable}
          sx={{ width: "fit-content", alignSelf: "flex-end", mt: 2 }}
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NewTable;
