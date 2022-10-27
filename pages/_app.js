import GlobalStyle from "../components/GlobalStyle";
import Layout from "../pages/Layout";
import "react-datepicker/dist/react-datepicker.css";
import { loadLocalStorage } from "../components/LocalStorage";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [startDate, setStartDate] = useState(new Date());
  const [fishList, setFishList] = useState(
    loadLocalStorage("localFishList") ?? []
  );
  const [fishName, setFishName] = useState("");
  const [fishWeight, setFishWeight] = useState();
  const [fishLength, setFishLength] = useState();
  const [fishLocation, setFishLocation] = useState("");

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
          startDate={startDate}
          setStartDate={setStartDate}
          fishName={fishName}
          setFishName={setFishName}
          fishWeight={fishWeight}
          setFishWeight={setFishWeight}
          fishLength={fishLength}
          setFishLength={setFishLength}
          fishLocation={fishLocation}
          setFishLocation={setFishLocation}
        />
      </Layout>
    </>
  );
}

export default MyApp;
