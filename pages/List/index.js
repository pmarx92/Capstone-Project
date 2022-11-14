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
  }, [dataFromAPI]);

  return (
    <div>
      <h1>This is the List Page - Under Construction</h1>

      {dataFromAPI.map((data) => {
        return (
          <Card key={data._id}>
            <StyledImage src={data.cloudinarySrc} />

            <h2>
              <a>Name: {data.name}</a>
            </h2>
            <h3>Weight: {data.weight}</h3>
            <h3>Length: {data.length}</h3>
            <h3>Location: {data.location}</h3>
            <h3>Date: {data.date}</h3>

            <div>
              <Link href={`/${data._id}`}>
                <View>View</View>
              </Link>
              <Link href={`/${data._id}/edit`}>
                <Edit>Edit</Edit>
              </Link>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

const StyledImage = styled.img`
  width: 50%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  box-shadow: 0 0 10px black;
  padding: 1rem;
  margin: 1rem;
  &:hover {
    margin: 1.1rem;
  }
`;
const Edit = styled.button`
  padding: 0.5rem;
  margin: 0.5rem;
`;
const View = styled.button`
  padding: 0.5rem;
  margin: 0.5rem;
`;
