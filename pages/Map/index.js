import styled from "styled-components";
import { search, mapImages } from "../../components/lib/cloudinary";

export async function getStaticProps() {
  const results = await search();

  const { resources } = results;
  const images = mapImages(resources);

  console.log("images inside getStatic: ", images);

  return {
    props: { images },
  };
}

export default function Map({ images }) {
  return (
    <div>
      <h1>This is the Map Page - Under Construction</h1>
      {images.map((data) => {
        console.log("images map: ", data);
        return <StyledImage key={data.asset_id} src={data.image} />;
      })}
    </div>
  );
}
const StyledImage = styled.img`
  width: 15%;
  height: 15%;
  padding: 1rem;
`;
