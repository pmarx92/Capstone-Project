import styled from "styled-components";
import { search, mapImages } from "../../components/lib/cloudinary";
import { useState, useEffect } from "react";

export default function Map() {
  const [imageSrc, setImageSrc] = useState([]);

  async function run() {
    const results = await fetch("/api/search").then((r) => r.json());
    const allData = results.resources;
    setImageSrc(allData);
  }

  useEffect(() => {
    run();
  }, []);

  return (
    <div>
      <h1>This is the Map Page - Under Construction</h1>
      {imageSrc.map((data) => {
        return <StyledImage key={data.asset_id} src={data.secure_url} />;
      })}
    </div>
  );
}
/* export async function getStaticProps() {
  const results = await search();

  const { resources, next_cursor: nextCursor } = results;
  const images = mapImages(resources);
  return {
    props: { images, nextCursor },
  };
} */
const StyledImage = styled.img`
  width: 15%;
  height: 15%;
  padding: 1rem;
`;
