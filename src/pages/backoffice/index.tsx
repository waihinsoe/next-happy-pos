import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getSelectedLocationId } from "@/utils";
import { fetchAppData } from "@/store/slices/appSlice";
import Loading from "@/components/Loading";
import { Box } from "@mui/material";
function BackOfficeApp() {
  const { data: session } = useSession();
  const router = useRouter();
  const selectedLocationId = getSelectedLocationId() as string;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session) {
      router.push("/backoffice/orders");
    }
  }, [session]);

  useEffect(() => {
    dispatch(fetchAppData(selectedLocationId));
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loading />
    </Box>
  );
}

export default BackOfficeApp;
