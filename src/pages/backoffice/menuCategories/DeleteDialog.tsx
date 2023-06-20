import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
  Typography,
  Box,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { menus as Menu } from "@prisma/client";

interface Props {
  title: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  callback: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteDialog = ({ title, open, setOpen, callback }: Props) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography sx={{ color: "red" }}>
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} variant="text">
          cancel
        </Button>
        <Button variant="contained" onClick={() => callback()} color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
