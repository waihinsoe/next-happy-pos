import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { decrement, increment } from "@/store/slices/counterSlice";
import { Box, Button, Typography } from "@mui/material";

const ReduxConcepts = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <Box>
      <Typography variant="h2" sx={{ textAlign: "center", mt: 5 }}>
        {count}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        <Button variant="contained" onClick={() => dispatch(decrement())}>
          Decrese (-)
        </Button>
        <Button variant="contained" onClick={() => dispatch(increment())}>
          Increse (+)
        </Button>
      </Box>
    </Box>
  );
};

export default ReduxConcepts;
