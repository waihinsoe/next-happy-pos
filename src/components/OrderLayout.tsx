import { Box } from "@mui/material";
import OrderAppHeader from "./OrderAppHeader";
import { useRouter } from "next/router";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const OrderLayout = ({ children }: Props) => {
  const router = useRouter();
  return (
    <Box>
      <OrderAppHeader />
      <Box
        sx={{
          position: "relative",
          zIndex: 5,
          top: -60,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "80%", lg: "50%" },
            m: "0 auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default OrderLayout;
