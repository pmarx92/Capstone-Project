import styled from "styled-components";

export async function getStaticProps() {
  const results = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUDINARY_API_KEY +
            ":" +
            process.env.CLOUDINARY_API_SECRET
        ).toString("base64")}`,
      },
    }
  ).then((r) => r.json());

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
