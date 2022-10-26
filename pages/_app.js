import GlobalStyle from "../components/GlobalStyle";
import Layout from "../pages/Layout";
import "react-datepicker/dist/react-datepicker.css";
import { setLocalStorage, loadLocalStorage } from "../components/LocalStorage";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [fishList, setFishList] = useState(
    loadLocalStorage("localFishList") ?? []
  );

  useEffect(() => {
    setLocalStorage("localFishList", fishList);
  }, [fishList]);

  // To prevent the hydration error
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component
          {...pageProps}
          fishList={fishList}
          setFishList={setFishList}
        />
      </Layout>
    </>
  );
}

export default MyApp;
