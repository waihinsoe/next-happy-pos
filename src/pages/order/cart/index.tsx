import { OrderContext } from "@/contexts/OrderContext";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import type { addons as Addon } from "@prisma/client";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CartItem } from "@/typings/types";
import { config } from "@/config/config";
import { getCartTotalPrice } from "@/utils";
const Review = () => {
  const { cart, isLoading, updateData, fetchData } = useContext(OrderContext);
  const router = useRouter();
  const query = router.query;
  const { ...data } = useContext(OrderContext);

  useEffect(() => {
    if (!isLoading && !cart.length) {
      const isValid = query.locationId && query.tableId;

      isValid && router.push({ pathname: "/order", query });
    }
  }, [cart, query]);

  const renderAddons = (addons: Addon[]) => {
    if (!addons.length) return;
    return (
      <Box sx={{ pl: 6 }}>
        {addons.map((addon) => {
          return (
            <Box
              key={addon.id}
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

  const removeCartItem = (cartItem: CartItem) => {
    const removingCartItem = cart.filter((item) => {
      return item.id !== cartItem.id;
    });
    updateData({ ...data, cart: removingCartItem });
  };

  const comfirmOrder = async () => {
    const { locationId, tableId } = query;
    const isValid = locationId && tableId && cart.length;
    if (!isValid) return alert("locationId and tableId are required.");
    const response = await fetch(
      `${config.orderApiBaseUrl}?locationId=${locationId}&tableId=${tableId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      }
    );

    if (response.ok) {
      const responseJson = await response.json();
      const order = responseJson.order;
      fetchData();
      router.push({ pathname: `/order/activeOrder/${order.id}`, query });
    }
  };
  if (!cart.length) return null;
  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <Box sx={{ width: { xs: "100%", md: "500px" } }}>
        <Typography variant="h5" sx={{ textAlign: "center", mb: 3 }}>
          Review Card
        </Typography>
        {cart.map((cartItem, index) => {
          const { menu, addons, quantity } = cartItem;
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
                  onClick={() => removeCartItem(cartItem)}
                />
                <EditIcon
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
          <Typography>Total : {getCartTotalPrice(cart)}</Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Button variant="contained" onClick={comfirmOrder}>
            Comfirm Order
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Review;
