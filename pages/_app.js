import GlobalStyle from "../components/GlobalStyle";
import Layout from "../pages/Layout";

import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [latlng, setLatLng] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component
          {...pageProps}
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
