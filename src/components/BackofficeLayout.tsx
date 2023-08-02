import { Box } from "@mui/material";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { useAppSelector } from "@/store/hook";
import Loading from "./Loading";

type Props = {
  children: string | JSX.Element | JSX.Element[];
  title?: string;
};

const BackofficeLayout = (props: Props) => {
  const { isLoading } = useAppSelector((state) => state.app);
  return (
    <Box>
      <TopBar title={props.title} />
      <Box sx={{ display: "flex", height: "100vh", bgcolor: "#E8F6EF" }}>
        <SideBar />
        {!isLoading ? (
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
        ) : (
          <Loading />
        )}
      </Box>
    </Box>
  );
};

export default BackofficeLayout;
