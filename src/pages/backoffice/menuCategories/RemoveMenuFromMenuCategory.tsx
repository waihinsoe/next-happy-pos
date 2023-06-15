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
  open: boolean;
  setOpen: (value: boolean) => void;
  menu: Menu | undefined;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RemoveMenuFromMenuCategory = ({ open, setOpen, menu }: Props) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setOpen(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Remove menu from this menu category</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Typography sx={{ color: "red" }}>
            Are you sure you want to remove the menu from this menu category?
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography>
              Menu that will be removed from this menu category:{" "}
              <b style={{ textTransform: "uppercase" }}>{menu?.name}</b>
            </Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} variant="text">
          cancel
        </Button>
        <Button variant="contained">Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveMenuFromMenuCategory;
