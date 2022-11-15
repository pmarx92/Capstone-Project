import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function List() {
  const [dataFromAPI, setDataFromAPI] = useState([]);
  async function fetchAPI() {
    const res = await fetch("/api/formdata");
    const data = await res.json();
    setDataFromAPI(data.data);
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div>
      {dataFromAPI.map((data) => {
        return (
          <Card key={data._id}>
            <Container>
              <StyledPara>Caught fish: {data.name}</StyledPara>
              <StyledPara>Weight: {data.weight}kg</StyledPara>
              <StyledPara>Length: {data.length}cm</StyledPara>
              <StyledPara>Location: {data.location}</StyledPara>
              <StyledPara>Date: {data.date}</StyledPara>
            </Container>
            <ButtonContainer>
              <Link href={`/${data._id}`}>
                <View>View</View>
              </Link>
              <Link href={`/${data._id}/edit`}>
                <Edit>Edit</Edit>
              </Link>
            </ButtonContainer>
          </Card>
        );
      })}
    </div>
  );
}

const StyledPara = styled.p`
  font-size: 21px;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  margin-left: 4rem;

  @media (min-width: 568px) {
    margin-left: 6rem;
  }
  @media (min-width: 768px) {
    margin-left: 2rem;
  }
  @media (min-width: 968px) {
    margin-left: 12rem;
  }
  @media (min-width: 1368px) {
    margin-left: 21rem;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
const Card = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  box-shadow: 0 0 10px black;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 0 25px 25px 0;

  @media (min-width: 568px) {
    width: 65%;
  }
  @media (min-width: 768px) {
    width: 50%;
  }
  @media (min-width: 1368px) {
    width: 33%;
  }
`;
const Edit = styled.button`
  font-size: large;
  border-radius: 25px;
  border: 0;
  color: var(--white);
  background-color: var(--backgroundColor-green);
  padding: 0.6rem 1.5rem;

  &:hover {
    box-shadow: 0 0 10px var(--backgroundColor-dark);
  }
`;
const View = styled.button`
  font-size: large;
  border-radius: 25px;
  border: 0;
  color: var(--white);
  background-color: var(--backgroundColor-dark);
  padding: 0.6rem 1.5rem;

  &:hover {
    box-shadow: 0 0 10px var(--backgroundColor-green);
  }
`;
