import { Box } from "@mui/material";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import { useAppSelector } from "@/store/hook";
import Loading from "./Loading";
import { useEffect } from "react";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils";
import { RootState } from "@/store";

type Props = {
  children: string | JSX.Element | JSX.Element[];
  title?: string;
};

const BackofficeLayout = (props: Props) => {
  const { locations } = useAppSelector(appData);
  const { isLoading } = useAppSelector((state: RootState) => state.app);
  useEffect(() => {
    const selectedLocationId = getSelectedLocationId();
    if (!selectedLocationId) {
      locations.length &&
        localStorage.setItem("selectedLocation", String(locations[0].id));
    }
  }, [locations]);
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
