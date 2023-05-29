import AppProvider from "@/contexts/AppContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </SessionProvider>
  );
}
