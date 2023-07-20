import BackOfficeProvider from "@/contexts/BackOfficeContext";
import OrderProvider from "@/contexts/OrderContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { Provider } from "react-redux";
import { store } from "@/store";
import { getSelectedLocationId } from "@/utils";
import { useEffect } from "react";
import { fetchAppData } from "@/store/slices/appSlice";
import { fetchOrderAppData } from "@/store/slices/orderAppSlice";
import { useRouter } from "next/router";

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
    store.dispatch(fetchAppData(selectedLocationId));
    if (selectedOrderAppLocationId) {
      store.dispatch(fetchOrderAppData(selectedOrderAppLocationId));
    }
  }, [selectedOrderAppLocationId, selectedLocationId]);
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
