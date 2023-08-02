import { Box, Typography } from "@mui/material";
import Image from "next/image";
import OrderAppHeaderImg from "@/assets/order_app_header.svg";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hook";
import { orderAppData } from "@/store/slices/orderAppSlice";

const OrderAppHeader = () => {
  const router = useRouter();
  const isCartPage = router.pathname === "/order/cart";
  const query = router.query;
  const isHomePage = router.pathname === "/order";
  const { cart, company } = useAppSelector(orderAppData);
  const cartItemCount = cart.length;
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
      {!isCartPage && (
        <Box
          sx={{
            position: "absolute",
            right: { xs: 40, md: 80, lg: 200, xl: 400 },
            top: 10,
            cursor: "pointer",
          }}
          onClick={() => router.push({ pathname: "/order/cart", query })}
        >
          <ShoppingCartCheckoutIcon
            sx={{ fontSize: "40px", color: "#FFE194" }}
          />

          {cartItemCount > 0 && (
            <Typography
              variant="h5"
              sx={{
                position: "absolute",
                color: "#E8F6EF",
                top: -10,
                right: -10,
              }}
            >
              {cartItemCount}
            </Typography>
          )}
        </Box>
      )}

      <Image
        src={OrderAppHeaderImg}
        alt="orderAppHeader"
        style={{ width: "100%", objectFit: "cover", padding: 0, margin: 0 }}
      />
      {isHomePage && (
        <Box sx={{ position: "absolute" }}>
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
