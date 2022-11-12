import styled from "styled-components";
import { cloudinary } from "../../components/lib/cloudinary";

export async function getStaticProps() {
  const results = await cloudinary();

  const { resources } = results;
  const images = resources.map((resource) => {
    return {
      id: resource.asset_id,
      title: resource.public_id,
      image: resource.secure_url,
    };
  });
  return {
    props: { images },
  };
}

export default function Map({ images }) {
  return (
    <div>
      <h1>This is the Map Page - Under Construction</h1>
      {images?.map((image) => {
        return <StyledImage key={image.id} src={image.image} />;
      })}
    </div>
  );
}
const StyledImage = styled.img`
  width: 15%;
  height: 15%;
  padding: 1rem;
`;
