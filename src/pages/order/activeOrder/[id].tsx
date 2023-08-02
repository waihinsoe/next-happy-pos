import { useAppSelector } from "@/store/hook";
import { orderAppData } from "@/store/slices/orderAppSlice";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const ActiveOrder = () => {
  const { orders } = useAppSelector(orderAppData);
  const router = useRouter();
  const query = router.query;
  const orderId = query.id;

  const order = orders.find((item) => item.id === Number(orderId));

  if (!order) return null;

  return (
    <Box>
      <Typography>orderId :{order.id}</Typography>
      <Typography>orderPrice :{order.price}</Typography>
    </Box>
  );
};

export default ActiveOrder;
