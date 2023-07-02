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
  const renderMenusForOrder = (orderId: number, orderLines: OrderLine[]) => {
    const validOrderLines = orderLines.filter(
      (item) => item.orders_id === orderId
    );
    const validMenuIds = [
      ...new Set(validOrderLines.map((orderLine) => orderLine.menus_id)),
    ];
    const validMenusAndAddons = validMenuIds.map((menuId) => {
      const menu = menus.find((item) => item.id === menuId);
      if (menu) {
        const validAddonIds = orderLines
          .filter((orderLine) => orderLine.menus_id === menu.id)
          .map((item) => item.addons_id);
        const validAddons = addons.filter((item) =>
          validAddonIds.includes(item.id)
        );
        return { menu, validAddons };
      }
    }) as {
      menu: Menu;
      validAddons: Addon[];
    }[]; //for type
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {validMenusAndAddons.length &&
          validMenusAndAddons.map((item) => {
            const { menu, validAddons } = item;
            return (
              <Box
                sx={{
                  display: "flex",
                  gap: 4,
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <Avatar
                    alt="menu"
                    src={menu.asset_url || ""}
                    sx={{ width: 56, height: 56 }}
                  />
                  <Typography variant="body2">{menu.name}</Typography>
                </Box>
                {validAddons.length
                  ? validAddons.map((addon) => {
                      return <Box>{addon.name}</Box>;
                    })
                  : "empty addons"}
              </Box>
            );
          })}
      </Box>
    );
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
          {getNumberOfMenusByOrderId(Number(order.id), orderLines)}
        </TableCell>
        <TableCell align="right">{order.tables_id}</TableCell>
        <TableCell align="right">{order.is_paid ? "Yes" : "No"}</TableCell>
        <TableCell align="right">{order.price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit sx={{ py: 2 }}>
            {renderMenusForOrder(order.id, orderLines)}
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
                orderLines={orderLines}
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
