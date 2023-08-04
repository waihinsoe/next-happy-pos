import OrderLayout from "@/components/OrderLayout";
import { useAppSelector } from "@/store/hook";
import { orderAppData } from "@/store/slices/orderAppSlice";
import { getCartTotalPrice, renderAddons } from "@/utils";
import { Avatar, Box, Chip, Divider, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { addons as Addon, menus as Menu, OrderStatus } from "@prisma/client";

const ActiveOrder = () => {
  const { orders, orderLines, addons, menus } = useAppSelector(orderAppData);
  const router = useRouter();
  const query = router.query;
  const currentLocationId = Number(query.locationId);
  const currentTableId = Number(query.tableId);

  const tableOrders = orders.filter(
    (order) =>
      order.locations_id === currentLocationId &&
      order.tables_id === currentTableId
  );
  const tableOrderIds = tableOrders.map((tableOrder) => tableOrder.id);

  const tableOrderLines = orderLines.filter((orderLine) =>
    tableOrderIds.includes(orderLine.orders_id)
  );

  const orderLineItemIds = tableOrderLines.map((item) => item.item_id);
  const itemIds: string[] = [];
  orderLineItemIds.map((item) => {
    const hasAdded = itemIds.includes(item);
    if (!hasAdded) itemIds.push(item);
  });

  const activeOrders = itemIds.map((itemId) => {
    const menuId = tableOrderLines.find(
      (item) => item.item_id === itemId
    )?.menus_id;
    const validMenu = menus.find((menu) => menu.id === menuId);
    const addonIds = tableOrderLines
      .filter((item) => item.item_id === itemId)
      .map((item) => item.addons_id) as number[];

    const validAddons = addons.filter((addon) => addonIds.includes(addon.id));
    const quantity = tableOrderLines.find((item) => item.item_id === itemId)
      ?.quantity as number;
    const status = tableOrderLines.find((item) => item.item_id === itemId)
      ?.order_status as OrderStatus;

    return {
      id: itemId,
      menu: validMenu as Menu,
      addons: validAddons,
      quantity,
      status,
    };
  });

  const chooseOrderStatusColor = (status: OrderStatus) => {
    if (status === "PENDING") return "#F9D923";
    if (status === "PREPARING") return "#187498";
    if (status === "COMPLETE") return "#36AE7C";
    if (status === "REJECTED") return "#EB5353";
  };

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
            Active Orders
          </Typography>
          {activeOrders.map((item, index) => {
            const { menu, addons, quantity, status } = item;
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

                <Box sx={{ mt: 2, textAlign: "right" }}>
                  <Chip
                    label={status}
                    sx={{
                      bgcolor: chooseOrderStatusColor(status),
                      color: "#FFF",
                    }}
                  />
                </Box>
                <Divider sx={{ my: 2 }} />
              </Box>
            );
          })}

          <Box sx={{ textAlign: "right", mb: 2 }}>
            <Typography variant="h5" color={"primary"}>
              Total : {getCartTotalPrice(activeOrders)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </OrderLayout>
  );
};

export default ActiveOrder;
