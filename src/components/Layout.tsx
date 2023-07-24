import { Box } from "@mui/material";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { useContext } from "react";
import { useAppSelector } from "@/store/hook";

type Props = {
  children: string | JSX.Element | JSX.Element[];
  title?: string;
};

const Layout = (props: Props) => {
  const { isLoading } = useAppSelector((state) => state.app);
  if (isLoading) return null;
  return (
    <Box>
      <TopBar title={props.title} />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <SideBar />
        <Box
          sx={{
            p: 3,
            width: "100%",
            overflow: "scroll",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
