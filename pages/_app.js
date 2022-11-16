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
      <Layout>
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
      </Layout>
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

const Spinner = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100px;
  width: 100px;
  margin: 0 auto;
  -webkit-animation: rotation 1.8s infinite linear;
  -moz-animation: rotation 1.8s infinite linear;
  -o-animation: rotation 1.8s infinite linear;
  animation: rotation 1.8s infinite linear;
  border: 6px solid var(--backgroundColor-green);

  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(359deg);
    }
  }
  @-moz-keyframes rotation {
    from {
      -moz-transform: rotate(0deg);
    }
    to {
      -moz-transform: rotate(359deg);
    }
  }

  @-o-keyframes rotation {
    from {
      -o-transform: rotate(0deg);
    }
    to {
      -o-transform: rotate(359deg);
    }
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;

export default MyApp;
