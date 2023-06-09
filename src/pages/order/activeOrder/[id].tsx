import { OrderContext } from "@/contexts/OrderContext";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const activeOrder = () => {
  const { orders, orderLines } = useContext(OrderContext);
  const router = useRouter();
  const query = router.query;
  const orderId = query.id;

  const order = orders.find((item) => item.id === Number(orderId));

  useEffect(() => {
    if (!order) {
      router.push({ pathname: "/order", query });
    }
  }, [order]);

  if (!order) return null;

  return (
    <Box>
      <Typography>orderId :{order.id}</Typography>
      <Typography>orderPrice :{order.price}</Typography>
    </Box>
  );
};

export default activeOrder;
