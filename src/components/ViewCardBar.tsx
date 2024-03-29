import { useAppSelector } from "@/store/hook";
import { orderAppData } from "@/store/slices/orderAppSlice";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
const ViewCardBar = () => {
  const router = useRouter();
  const query = router.query;
  const { cart } = useAppSelector(orderAppData);
  const cartText = `You have ${cart.length} item in cart.`;
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        backgroundColor: "lightblue",
        width: "100%",
        py: 2,
        cursor: "pointer",
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        onClick={() => router.push({ pathname: "/order/cart", query })}
      >
        <ShoppingCartCheckoutIcon sx={{ fontSize: "40px", color: "blue" }} />
        <Typography variant="h6" component={"div"} sx={{ color: "green" }}>
          {cartText}
        </Typography>
      </Box>
    </Box>
  );
};

export default ViewCardBar;
