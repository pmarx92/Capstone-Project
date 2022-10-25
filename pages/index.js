import Head from "next/head";
import styled from "styled-components";
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";

export default function Home() {
  return (
    <div>
      <Header />
      <Head>
        <title>My App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main></Main>
      <Navigation />
    </div>
  );
}

const Main = styled.main`
  text-align: center;
`;
