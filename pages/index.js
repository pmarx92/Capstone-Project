import styled from "styled-components";
import { useState } from "react";
import { search, mapImages } from "../components/lib/cloudinary";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

export async function getServerSideProps() {
  const results = await search();
  const { resources } = results;
  const images = mapImages(resources);

  return {
    props: { images },
  };
}

export default function Home({ images }) {
  const [current, setCurrent] = useState(0);

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  const prevImage = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextImage = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  return (
    <ImageSlider>
      <LeftArrow onClick={prevImage} />
      <RightArrow onClick={nextImage} />
      {images.map((data, index) => {
        return (
          <>
            {index === current && (
              <StyledImage key={data.id} src={data.image} alt={data.title} />
            )}
          </>
        );
      })}
    </ImageSlider>
  );
}

const ImageSlider = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 6rem;
`;
const LeftArrow = styled(MdArrowBackIosNew)`
  position: absolute;
  top: -5rem;
  left: 32px;
  font-size: 3rem;
  color: var(--backgroundColor-green);

  z-index: 5;
  cursor: pointer;
  user-select: none;

  @media (min-width: 468px) {
    left: 60px;
  }

  @media (min-width: 950px) {
    left: 125px;
  }
  @media (min-width: 1100px) {
    bottom: 10rem;
    left: 100px;
  }
  @media (min-width: 1450px) {
    left: 350px;
    bottom: 15rem;
  }
`;
const RightArrow = styled(MdArrowForwardIos)`
  position: absolute;
  top: -5rem;
  right: 32px;
  font-size: 3rem;
  color: var(--backgroundColor-green);

  z-index: 5;
  cursor: pointer;
  user-select: none;

  @media (min-width: 468px) {
    right: 60px;
  }
  @media (min-width: 950px) {
    right: 125px;
  }
  @media (min-width: 1100px) {
    right: 100px;
    bottom: 10rem;
  }
  @media (min-width: 1450px) {
    right: 350px;
    bottom: 15rem;
  }
`;
const StyledImage = styled.img`
  width: 90vw;
  border-radius: 40px;
  box-shadow: 0 0 10px var(--backgroundColor-dark);

  @media (min-width: 468px) {
    width: 90vw;
  }
  @media (min-width: 950px) {
    width: 80vw;
  }
  @media (min-width: 1100px) {
    width: 60vw;
  }
  @media (min-width: 1450px) {
    width: 44%;
  }
`;
