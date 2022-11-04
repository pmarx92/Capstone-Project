import GlobalStyle from "../components/GlobalStyle";
import Layout from "../pages/Layout";
import "react-datepicker/dist/react-datepicker.css";
import useLocalStorage from "../components/hooks/LocalStorage";
import { useState } from "react";
import { useEffect } from "react";
/* import data from "../components/DataFetching"; */

function MyApp({ Component, pageProps, data }) {
  const [startDate, setStartDate] = useState(new Date());
  const [fishList, setFishList] = useLocalStorage("fishList", []);
  const [fishName, setFishName] = useState("");
  const [fishWeight, setFishWeight] = useState();
  const [fishLength, setFishLength] = useState();
  const [fishLocation, setFishLocation] = useState("");

  const [fetchedData, setFetchedData] = useState([]);

  async function fetchAPI() {
    const request = await fetch("http://localhost:3000/api/formdata");
    const data = await request.json();
    console.log(data.data);
    setFetchedData(data.data);
    const array = [
      {
        name: "Patrick",
        alter: 30,
      },
      {
        name: "Celine",
        alter: 24,
      },
    ];
    console.log(
      array[0].name +
        " ist " +
        array[0].alter +
        " Jahre alt und " +
        array[1].name +
        " ist " +
        array[1].alter +
        " Jahre alt"
    );
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
        />
      </Layout>
    </>
  );
}

export default MyApp;
