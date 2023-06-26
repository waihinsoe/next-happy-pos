import { OrderContext } from "@/contexts/OrderContext";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import type { addons as Addon } from "@prisma/client";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { OrderLine } from "@/typings/types";
const Review = () => {
  const { orderLines, isLoading, updateData } = useContext(OrderContext);
  const router = useRouter();
  const query = router.query;
  const { ...data } = useContext(OrderContext);

  useEffect(() => {
    if (!isLoading && !orderLines.length) {
      const isValid = query.locationId && query.tableId;

      isValid && router.push({ pathname: "/order", query });
    }
  }, [orderLines, query]);

  const renderAddons = (addons: Addon[]) => {
    if (!addons.length) return;
    return (
      <Box sx={{ pl: 6 }}>
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

  const removeOrderLineFromCart = (orderLine: OrderLine) => {
    const removingOrderLines = orderLines.filter((item) => {
      return item.menu.id !== orderLine.menu.id;
    });
    updateData({ ...data, orderLines: removingOrderLines });
  };
  if (!orderLines.length) return null;
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: { xs: "100%", md: "500px" } }}>
        <Typography variant="h5" sx={{ textAlign: "center", mb: 3 }}>
          Review Card
        </Typography>
        {orderLines.map((orderLine, index) => {
          const { menu, addons, quantity } = orderLine;
          return (
            <Box key={index}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    bgcolor: "green",
                    width: "25px",
                    height: "25px",
                    fontSize: 16,
                    mr: 1,
                  }}
                >
                  {quantity}
                </Avatar>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexGrow: 1,
                  }}
                >
                  <Typography>{menu.name}</Typography>
                  <Typography>{menu.price}</Typography>
                </Box>
              </Box>

              {renderAddons(addons)}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 2,
                }}
              >
                <DeleteIcon
                  sx={{ mr: 2, cursor: "pointer" }}
                  onClick={() => removeOrderLineFromCart(orderLine)}
                />
                <EditIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push({
                      pathname: `menus/${orderLine.menu.id}`,
                      query,
                    });
                  }}
                />
              </Box>
              <Divider sx={{ my: 2 }} />
            </Box>
          );
        })}
        <Box sx={{ textAlign: "center" }}>
          <Button variant="contained">Comfirm Order</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Review;
