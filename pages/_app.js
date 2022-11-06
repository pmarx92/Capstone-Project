import GlobalStyle from "../components/GlobalStyle";
import Layout from "../pages/Layout";
import "react-datepicker/dist/react-datepicker.css";
import useLocalStorage from "../components/hooks/LocalStorage";
import { useState } from "react";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [startDate, setStartDate] = useState(new Date());
  const [fishList, setFishList] = useLocalStorage("fishList", []);
  const [fishName, setFishName] = useState("");
  const [fishWeight, setFishWeight] = useState();
  const [fishLength, setFishLength] = useState();
  const [fishLocation, setFishLocation] = useState("");
  const [markerPosition, setMarkerPosition] = useState([]);

  const [fetchedData, setFetchedData] = useState([]);
  const [latlng, setLatLng] = useState([]);

  async function fetchAPI() {
    const res = await fetch("http://localhost:3000/api/formdata");
    const data = await res.json();
    setFetchedData(data.data);
  }

  useEffect(() => {
    fetchAPI();
  }, []);

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
          fetchedData={fetchedData}
          setLatLng={setLatLng}
          latlng={latlng}

        />
      </Layout>
    </>
  );
}

export default MyApp;
