import "bootstrap/dist/css/bootstrap.min.css";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../styles/spinner.css";

import "../styles/jquery-ui.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/spinner.css";
import "../styles/slick.min.css";
import "../styles/slick-theme.min.css";
import "../styles/style.css";
import "../styles/custom.css";
import "../styles/multiRangeSlider.css";
import shallow from "zustand/shallow";
import "../styles/responsive.css";
import Login from "./login";
import useUserStore from "../zustand/store";
import { useEffect } from "react";

// import $ from "jquery";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
function MyApp({ Component, pageProps }: AppProps) {
  const loginPopup = useUserStore((state: any) => state.loginPopup);
  const setLoginPopup = useUserStore((state: any) => state.showLogin);

  useEffect(() => {
    console.log("HACKER", loginPopup);
  }, [loginPopup]);

  return (
    <>
      <Head>
        <title>NavTatva</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ToastContainer />
      <Login
        onSuccess={() => {}}
        visible={loginPopup}
        onClose={() => {
          setLoginPopup(false);
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
