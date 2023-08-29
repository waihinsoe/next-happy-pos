import { store } from "@/store";
import { fetchAppData } from "@/store/slices/appSlice";
import { fetchOrderAppData } from "@/store/slices/orderAppSlice";
import "@/styles/globals.css";
import { getSelectedLocationId } from "@/utils";
import { theme } from "@/utils/theme";
import { ThemeProvider } from "@mui/material";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";

type CustomeAppProps = AppProps & { session: Session };

export default function App({
  Component,
  pageProps,
  session,
}: CustomeAppProps) {
  const router = useRouter();
  const selectedLocationId = getSelectedLocationId() as string;
  const selectedOrderAppLocationId = router.query.locationId as string;

  useEffect(() => {
    console.log(selectedLocationId);
    store.dispatch(fetchAppData(selectedLocationId));
    if (selectedOrderAppLocationId) {
      store.dispatch(fetchOrderAppData(selectedOrderAppLocationId));
    }
  }, [selectedOrderAppLocationId, selectedLocationId]);

  return (
    <>
      {/* <head>
        <title>Happy POS</title>
      </head> */}
      <SessionProvider session={session}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>
      </SessionProvider>
    </>
  );
}
