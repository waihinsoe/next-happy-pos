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

type CustomeAppProps = AppProps & { session: Session };

export default function App({
  Component,
  pageProps,
  session,
}: CustomeAppProps) {
  const selectedLocationId = getSelectedLocationId() as string;

  useEffect(() => {
    store.dispatch(fetchAppData(selectedLocationId));
  }, []);
  return (
    // <SessionProvider session={session}>
    //   <BackOfficeProvider>
    //     <OrderProvider>
    //       <Component {...pageProps} />
    //     </OrderProvider>
    //   </BackOfficeProvider>
    // </SessionProvider>
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}
