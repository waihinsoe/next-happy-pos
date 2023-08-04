import { Box } from "@mui/material";
import OrderAppHeader from "./OrderAppHeader";
import { useAppSelector } from "@/store/hook";
import { orderAppData } from "@/store/slices/orderAppSlice";
import Loading from "./Loading";
import { useRouter } from "next/router";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const OrderLayout = ({ children }: Props) => {
  const router = useRouter();
  const isHomePage = router.pathname === "/order";
  const isCartPage = router.pathname === "/order/cart";
  const isActiveOrderPage = router.pathname.includes("/activeOrder");
  const { isLoading } = useAppSelector(orderAppData);

  return (
    <Box
      sx={{
        bgcolor: isCartPage || isActiveOrderPage ? "#ffffff" : "#E8F6EF",
        minHeight: "100vh",
      }}
    >
      <OrderAppHeader />

      <Box
        sx={{
          position: "relative",
          zIndex: 5,
          top: isHomePage ? -60 : 0,
        }}
      >
        {!isLoading ? (
          <Box
            sx={{
              width: { xs: "100%", md: "80%", lg: "50%" },
              m: "0 auto",
            }}
          >
            {children}
          </Box>
        ) : (
          <Loading />
        )}
      </Box>
    </Box>
  );
};

export default OrderLayout;
