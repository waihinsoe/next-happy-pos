import BackofficeLayout from "@/components/BackofficeLayout";
import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { appData, fetchAppData } from "@/store/slices/appSlice";
import { fetchOrderLines } from "@/store/slices/orderLinesSlice";
import {
  getNumberOfMenusByOrderId,
  getOrdersByLocationIdAndTableId,
  getSelectedLocationId,
} from "@/utils";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Collapse,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  OrderStatus,
  type addons as Addon,
  type addon_categories as AddonCategory,
  type menus as Menu,
  type orders as Order,
  type orderLines as OrderLine,
} from "@prisma/client";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
interface Props {
  orders: Order[];
  order: Order;
  orderLines: OrderLine[];
  menus: Menu[];
  addons: Addon[];
  addonCategories: AddonCategory[];
}

const Row = ({
  orders,
  order,
  orderLines,
  menus,
  addons,
  addonCategories,
}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const renderMenusAddonsFromOrder = () => {
    const orderLineItemIds = orderLines.map((item) => item.item_id);
    const itemIds: string[] = [];
    orderLineItemIds.map((item) => {
      const hasAdded = itemIds.includes(item);
      if (!hasAdded) itemIds.push(item);
    });

    const orderLineMenus = itemIds.map((itemId) => {
      const orderLineAddonIds = orderLines
        .filter((item) => item.item_id === itemId)
        .map((item) => item.addons_id) as number[];

      //Addons
      const orderLineAddons = addons.filter((addon) =>
        orderLineAddonIds.includes(addon.id)
      );
      //Menu
      const menuId = orderLines.find(
        (item) => item.item_id === itemId
      )?.menus_id;
      const orderLineMenu = menus.find((menu) => menu.id === menuId);
      //status
      const status = orderLines.find(
        (item) => item.item_id === itemId
      )?.order_status;
      //quantity
      const quantity = orderLines.find(
        (item) => item.item_id === itemId
      )?.quantity;
      // AddonsWithCategories
      const addonsWithCategories: { [key: number]: Addon[] } = {};
      orderLineAddons.forEach((item) => {
        const addonCategory = addonCategories.find(
          (addonCategory) => addonCategory.id === item.addon_categories_id
        ) as AddonCategory;
        if (!addonsWithCategories[addonCategory.id]) {
          addonsWithCategories[addonCategory.id] = [item];
        } else {
          addonsWithCategories[addonCategory.id] = [
            ...addonsWithCategories[addonCategory.id],
            item,
          ];
        }
      });

      // const respectiveAddonCategoryIds = [
      //   ...new Set(orderLineAddons.map((item) => item.addon_categories_id)),
      // ];
      // const respectiveAddonCategories = addonCategories.filter((item) =>
      //   respectiveAddonCategoryIds.includes(item.id)
      // );

      // const addonsWithCategories = respectiveAddonCategories.map(
      //   (addonCategory) => {
      //     const respectiveAddons = orderLineAddons.filter(
      //       (addon) => addon.addon_categories_id === addonCategory.id
      //     );

      //     return { addonCategory, respectiveAddons };
      //   }
      // );

      return {
        id: itemId,
        menu: orderLineMenu,
        status,
        addonsWithCategories,
        quantity,
      };
    });
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {orderLineMenus.map((item) => (
          <Box key={item.menu?.id}>
            <Paper sx={{ width: 250, height: 300, p: 2 }} elevation={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6">{item.menu?.name}</Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        width: 30,
                        height: 30,
                        backgroundColor: "#1B9C85",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                      }}
                    >
                      {item.quantity}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box
                    sx={{
                      height: "150px",
                      overflowY: "scroll",
                      "&::-webkit-scrollbar": {
                        width: 7,
                      },
                      "&::-webkit-scrollbar-track": {},
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#1B9C85",
                        borderRadius: 2,
                      },
                    }}
                  >
                    {Object.keys(item.addonsWithCategories).map(
                      (addonCategoryId) => {
                        const addonCategory = addonCategories.find(
                          (item) => item.id === Number(addonCategoryId)
                        ) as AddonCategory;
                        const addons =
                          item.addonsWithCategories[Number(addonCategoryId)];
                        return (
                          <Box sx={{ mb: 1.5 }} key={addonCategory.id}>
                            <Typography sx={{ fontWeight: "bold" }}>
                              {addonCategory.name}
                            </Typography>
                            <Box sx={{ ml: 2 }}>
                              {addons.map((addon) => {
                                return (
                                  <Box key={addon.id}>
                                    <Typography
                                      variant="body1"
                                      sx={{ fontStyle: "italic" }}
                                    >
                                      {addon.name}
                                    </Typography>
                                  </Box>
                                );
                              })}
                            </Box>
                          </Box>
                        );
                      }
                    )}
                  </Box>
                </Box>
                <Box>
                  <Divider sx={{ mb: 2 }} />
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="status">Status</InputLabel>
                      <Select
                        value={item.status}
                        label="Status"
                        onChange={(evt) =>
                          handleUpdateOrderStatus(evt, item.id)
                        }
                      >
                        <MenuItem value={OrderStatus.PENDING}>Pending</MenuItem>
                        <MenuItem value={OrderStatus.PREPARING}>
                          Preparing
                        </MenuItem>
                        <MenuItem value={OrderStatus.COMPLETE}>
                          Complete
                        </MenuItem>
                        <MenuItem value={OrderStatus.REJECTED}>Reject</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
    );
  };

  const handleUpdateOrderStatus = async (
    evt: SelectChangeEvent<"PENDING" | "PREPARING" | "COMPLETE" | "REJECTED">,
    itemId: string | undefined
  ) => {
    const orderId = order.id;
    const isValid = orderId && itemId;
    if (!isValid) return;

    const response = await fetch(`${config.apiBaseUrl}/orderLines`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, itemId, status: evt.target.value }),
    });
    if (response.ok) {
      dispatch(fetchOrderLines(orders));
    }
  };
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{order.id}</TableCell>
        <TableCell align="right">
          {getNumberOfMenusByOrderId(order.id, orderLines)}
        </TableCell>
        <TableCell align="right">{order.tables_id}</TableCell>
        <TableCell align="right">{order.is_paid ? "Yes" : "No"}</TableCell>
        <TableCell align="right">{order.price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit sx={{ my: 2 }}>
            {renderMenusAddonsFromOrder()}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const Orders = () => {
  const router = useRouter();
  const tableId = router.query.id as string;

  const { orders, orderLines, menus, addonCategories, addons } =
    useAppSelector(appData);
  const selectedLocationId = getSelectedLocationId() as string;

  const validOrders = getOrdersByLocationIdAndTableId(
    orders,
    selectedLocationId,
    tableId
  );

  const getOrderLinesByOrderId = (orderId: number) => {
    return orderLines.filter((orderLine) => orderLine.orders_id === orderId);
  };

  return (
    <BackofficeLayout title="Orders">
      <TableContainer component={Paper} sx={{ maxHeight: "100%" }}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="collapsible table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right">Order Id</TableCell>
              <TableCell align="right">No. of Menu</TableCell>
              <TableCell align="right">Table Id</TableCell>
              <TableCell align="right">Paid</TableCell>
              <TableCell align="right">Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {validOrders.map((order) => (
              <Row
                orders={orders}
                order={order}
                key={order.id}
                orderLines={getOrderLinesByOrderId(order.id)}
                menus={menus}
                addons={addons}
                addonCategories={addonCategories}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BackofficeLayout>
  );
};

export default Orders;
