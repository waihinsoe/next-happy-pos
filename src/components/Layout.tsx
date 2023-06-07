import { Box } from "@mui/material";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

type Props = {
  children: string | JSX.Element | JSX.Element[];
  title?: string;
};

const Layout = (props: Props) => {
  return (
    <Box>
      <TopBar title={props.title} />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <SideBar />
        <Box sx={{ p: 3, width: "100%" }}>{props.children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
