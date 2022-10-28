import GlobalStyle from "../components/GlobalStyle";
import Layout from "../pages/Layout";
import "react-datepicker/dist/react-datepicker.css";
import useLocalStorage from "../components/hooks/LocalStorage";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [startDate, setStartDate] = useState(new Date());
  const [fishList, setFishList] = useLocalStorage("fishList", []);
  const [fishName, setFishName] = useState("");
  const [fishWeight, setFishWeight] = useState();
  const [fishLength, setFishLength] = useState();
  const [fishLocation, setFishLocation] = useState("");

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
