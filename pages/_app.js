import GlobalStyle from "../components/GlobalStyle";
import Layout from "../pages/Layout";

import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [dataFromAPI, setDataFromAPI] = useState([]);
  const [latlng, setLatLng] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  async function fetchAPI() {
    const res = await fetch("/api/formdata");
    const data = await res.json();
    setDataFromAPI(data.data);
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
          dataFromAPI={dataFromAPI}
          setLatLng={setLatLng}
          latlng={latlng}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </Layout>
    </>
  );
}

export default MyApp;
