import { Box } from "@mui/material";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { useContext } from "react";
import { BackOfficeContext } from "@/contexts/BackOfficeContext";

type Props = {
  children: string | JSX.Element | JSX.Element[];
  title?: string;
};

const Layout = (props: Props) => {
  const { isLoading } = useContext(BackOfficeContext);
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
