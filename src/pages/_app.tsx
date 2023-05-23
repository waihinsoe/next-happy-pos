import AppProvider from "@/contexts/AppContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      {" "}
      <Component {...pageProps} />
    </AppProvider>
  );
}
