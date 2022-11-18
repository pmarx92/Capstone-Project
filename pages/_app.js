import GlobalStyle from "../components/GlobalStyle";
import Layout from "../pages/Layout";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BeatLoader from "react-spinners/BeatLoader";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [latlng, setLatLng] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) =>
      url === router.asPath &&
      setTimeout(() => {
        setLoading(false);
      }, 500);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return (
    <>
      <GlobalStyle />
      <Layout> </Layout>
      {loading ? (
        <Container>
          <BeatLoader color="green" />
        </Container>
      ) : (
        <Component
          {...pageProps}
          setLatLng={setLatLng}
          latlng={latlng}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      )}
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;

  top: 0;
  left: 0;

  z-index: 10;
`;

export default MyApp;
