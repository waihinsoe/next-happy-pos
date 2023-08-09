import OrderLayout from "@/components/OrderLayout";
import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  fetchOrderAppData,
  orderAppData,
  removeCartItem,
  setCartItem,
} from "@/store/slices/orderAppSlice";
import { CartItem } from "@/typings/types";
import { getCartTotalPrice, renderAddons } from "@/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import type { addons as Addon } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Review = () => {
  const { cart, isLoading } = useAppSelector(orderAppData);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    if (!isLoading && !cart.length) {
      const isValid = query.locationId && query.tableId;

      isValid && router.push({ pathname: "/order", query });
    }
  }, [cart, query, isLoading, router]);

  const handleRemoveCartItem = (cartItem: CartItem) => {
    dispatch(removeCartItem(cartItem));
  };

  const comfirmOrder = async () => {
    const { locationId, tableId } = query;
    const isValid = locationId && tableId && cart.length;
    if (!isValid) return alert("locationId and tableId are required.");
    const response = await fetch(
      `${config.apiBaseUrl}/order?locationId=${locationId}&tableId=${tableId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      }
    );

    if (response.ok) {
      const currentLocationId = locationId as string;
      dispatch(fetchOrderAppData(currentLocationId));
      dispatch(setCartItem([]));
      if (!isLoading) {
        router.push({ pathname: `/order/activeOrder/`, query });
      }
    }
  };
  if (!cart.length) return null;
  return (
    <OrderLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          bgcolor: "#E8F6EF",
          borderRadius: 15,
          p: 3,
          mx: 2,
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "500px" } }}>
          <Typography
            variant="h4"
            color={"primary"}
            sx={{ textAlign: "center", mb: 3 }}
          >
            Review Order
          </Typography>
          {cart.map((cartItem, index) => {
            const { menu, addons, quantity } = cartItem;
            return (
              <Box key={index}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{
                      bgcolor: "success.main",
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
                    <Typography color={"primary"} variant="h6">
                      {menu.name}
                    </Typography>
                    <Typography color={"primary"} variant="h6">
                      {menu.price}
                    </Typography>
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
                    color={"primary"}
                    sx={{ mr: 2, cursor: "pointer" }}
                    onClick={() => handleRemoveCartItem(cartItem)}
                  />
                  <EditIcon
                    color={"primary"}
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      router.push({
                        pathname: `updateMenu/${cartItem.id}`,
                        query,
                      });
                    }}
                  />
                </Box>
                <Divider sx={{ my: 2 }} />
              </Box>
            );
          })}

          <Box sx={{ textAlign: "right", mb: 2 }}>
            <Typography variant="h5" color={"primary"}>
              Total : {getCartTotalPrice(cart)}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Button variant="contained" onClick={comfirmOrder}>
              Comfirm Order
            </Button>
          </Box>
        </Box>
      </Box>
    </OrderLayout>
  );
};

export default Review;
