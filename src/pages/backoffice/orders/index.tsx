import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Layout from "@/components/Layout";
import { useContext, useState } from "react";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";
import { getNumberOfMenusByOrderId, getSelectedLocationId } from "@/utils";
import type {
  orders as Order,
  menus as Menu,
  addons as Addon,
} from "@prisma/client";
import type { orderLines as OrderLine } from "@prisma/client";
import { Avatar, Box, Collapse, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
interface Props {
  order: Order;
  orderLines: OrderLine[];
  menus: Menu[];
  addons: Addon[];
}

const Row = ({ order, orderLines, menus, addons }: Props) => {
  const [open, setOpen] = useState(false);
  const getMenusAddonsFromOrder = () => {
    const orderLineMenuIds = orderLines.map((item) => item.menus_id);
    const menuIds: number[] = [];
    orderLineMenuIds.map((item) => {
      const hasAdded = menuIds.includes(item);
      if (!hasAdded) menuIds.push(item);
    });

    const orderLineMenus = menuIds.map((menuId) => {
      const orderLineAddonIds = orderLines
        .filter((item) => item.menus_id === menuId)
        .map((item) => item.addons_id) as number[];
      const orderLineAddons = addons.filter((addon) =>
        orderLineAddonIds.includes(addon.id)
      );
      const orderLineMenu = menus.find((menu) => menu.id === menuId);
      return { menu: orderLineMenu, addons: orderLineAddons };
    });

    console.log("orderLineMenus :", orderLineMenus);

    return <Box>Hello</Box>;
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
          <Collapse in={open} timeout="auto" unmountOnExit>
            {getMenusAddonsFromOrder()}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const Orders = () => {
  const { orders, orderLines, menus, addons } = useContext(BackOfficeContext);
  const selectedLocationId = getSelectedLocationId() as string;

  const currentLocationOrders = orders.filter(
    (order) => order.locations_id === Number(selectedLocationId)
  );

  const getOrderLinesByOrderId = (orderId: number) => {
    return orderLines.filter((orderLine) => orderLine.orders_id === orderId);
  };

  return (
    <Layout title="Orders">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
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
            {currentLocationOrders.map((order) => (
              <Row
                order={order}
                key={order.id}
                orderLines={getOrderLinesByOrderId(order.id)}
                menus={menus}
                addons={addons}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Orders;
