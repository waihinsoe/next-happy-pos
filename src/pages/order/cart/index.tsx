import { OrderContext } from "@/contexts/OrderContext";
import { Box, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import type { addons as Addon } from "@prisma/client";
import { useRouter } from "next/router";

const Review = () => {
  const { orderLines, isLoading } = useContext(OrderContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !orderLines.length) {
      const query = router.query;
      const isValid = query.locationId && query.tableId;

      isValid && router.push({ pathname: "/order", query });
    }
  }, [orderLines, router.query]);

  const renderAddons = (addons: Addon[]) => {
    if (!addons.length) return;
    return (
      <Box sx={{ px: 2 }}>
        {addons.map((addon) => {
          return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>{addon.name}</Typography>
              <Typography>{addon.price}</Typography>
            </Box>
          );
        })}
      </Box>
    );
  };
  if (!orderLines.length) return null;
  return (
    <Box sx={{ maxWidth: 300 }}>
      <Typography variant="h3">
        {orderLines.map((orderLine, index) => {
          const { menu, addons, quantity } = orderLine;
          return (
            <Box key={index}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Typography>{quantity}</Typography>
                <Typography>{menu.name}</Typography>
              </Box>

              {renderAddons(addons)}
            </Box>
          );
        })}
      </Typography>
    </Box>
  );
};

export default Review;
