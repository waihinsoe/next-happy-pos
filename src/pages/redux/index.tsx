import { RootState } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchAppData } from "@/store/slices/appSlice";
import {
  decrement,
  fetchContent,
  increment,
  incrementByAmount,
} from "@/store/slices/counterSlice";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const ReduxConcepts = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const locationId = router.query.locationId as string;
  return (
    <Box>
      <Typography variant="h2" sx={{ textAlign: "center", mt: 5 }}>
        {count}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        <Button variant="contained" onClick={() => dispatch(decrement())}>
          Decrese (-)
        </Button>
        <Button
          variant="contained"
          onClick={() => dispatch(incrementByAmount(200))}
        >
          Increse (+)
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            if (locationId) dispatch(fetchAppData(locationId));
          }}
        >
          fetchContent
        </Button>
      </Box>
    </Box>
  );
};

export default ReduxConcepts;
