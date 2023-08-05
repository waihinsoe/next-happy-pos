import { Badge, Box, Typography } from "@mui/material";
import Image from "next/image";
import OrderAppHeaderImg from "@/assets/order_app_header.svg";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hook";
import { orderAppData } from "@/store/slices/orderAppSlice";
import ListAltIcon from "@mui/icons-material/ListAlt";

const OrderAppHeader = () => {
  const router = useRouter();
  const isMenusPage = router.pathname.includes("/menus");
  const isUpdateMenuPage = router.pathname.includes("/updateMenu");
  const isHomePage = router.pathname === "/order";
  const shouldShowCartIcon = isMenusPage || isUpdateMenuPage || isHomePage;
  const query = router.query;
  const { cart, company, orders, orderLines } = useAppSelector(orderAppData);
  const cartItemCount = cart.length;

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

  const orderCount = itemIds.length;
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: isHomePage ? "relative" : "fixed",
        zIndex: 5,
        top: -1,
      }}
    >
      {shouldShowCartIcon && (
        <Box
          sx={{
            position: "absolute",
            left: { xs: 40, md: 80, lg: 200, xl: 400 },
            top: 10,
            cursor: "pointer",
          }}
          onClick={() => router.push({ pathname: "/order/activeOrder", query })}
        >
          <Badge
            badgeContent={orderCount}
            color="primary"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            sx={{
              "& .MuiBadge-badge": {
                width: 30,
                height: 30,
                fontSize: 15,
                borderRadius: "50%",
              },
            }}
          >
            <ListAltIcon sx={{ fontSize: "40px", color: "#FFE194" }} />
          </Badge>
        </Box>
      )}
      {shouldShowCartIcon && (
        <Box
          sx={{
            position: "absolute",
            right: { xs: 40, md: 80, lg: 200, xl: 400 },
            top: 10,
            cursor: "pointer",
          }}
          onClick={() => router.push({ pathname: "/order/cart", query })}
        >
          <Badge
            badgeContent={cartItemCount}
            color="primary"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            sx={{
              "& .MuiBadge-badge": {
                width: 30,
                height: 30,
                fontSize: 15,
                borderRadius: "50%",
              },
            }}
          >
            <ShoppingCartCheckoutIcon
              sx={{ fontSize: "40px", color: "#FFE194" }}
            />
          </Badge>
        </Box>
      )}

      <Image
        src={OrderAppHeaderImg}
        alt="orderAppHeader"
        style={{ width: "100%", objectFit: "cover", padding: 0, margin: 0 }}
      />
      {isHomePage && (
        <Box sx={{ position: "absolute", zIndex: -1 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "#4C4C6D",
                mt: 16,
              }}
            >
              {company?.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontStyle: "italic",
                lineHeight: 1.3,
                mt: 2,
              }}
            >
              {company?.address}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default OrderAppHeader;
