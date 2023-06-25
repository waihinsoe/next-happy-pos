import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, IconButton, Typography } from "@mui/material";

interface Props {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantitySelector = ({ value, onIncrease, onDecrease }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
      }}
    >
      <IconButton color="primary" onClick={onDecrease}>
        <RemoveCircleIcon fontSize="large" />
      </IconButton>
      <Typography variant="h5">{value}</Typography>
      <IconButton color="primary" onClick={onIncrease}>
        <AddCircleIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;
