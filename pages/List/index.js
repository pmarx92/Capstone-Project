import styled from "styled-components";
import DatePicker from "react-datepicker";
import { useState } from "react";
import Link from "next/link";

export default function List({
  fishList,
  setFishList,
  startDate,
  setStartDate,
  fetchedData,
}) {
  const [storedId, setStoredId] = useState([]);
  const [editFishName, setEditFishName] = useState("");
  const [editFishWeight, setEditFishWeight] = useState("");
  const [editFisLength, setEditFishLength] = useState("");
  const [editFishLocation, setEditFishLocation] = useState("");

  const deleteCard = (id) => {
    setFishList(fishList.filter((fish) => fish.id !== id));
  };

  const editCard = (id) => {
    setFishList(
      fishList.map((fish) =>
        fish.id === id
          ? {
              id,
              fishName: editFishName,
              fishWeight: editFishWeight,
              fishLength: editFisLength,
              location: editFishLocation,
              date: startDate.toISOString(),
            }
          : fish
      )
    );
    setStoredId([]);
  };
  return (
    <div>
      <h1>This is the List Page - Under Construction</h1>
      {fetchedData.map((data) => {
        return (
          <Card key={data._id}>
            <h2>
              <a>Name: {data.name}</a>
            </h2>
            <h3>Weight: {data.weight}</h3>
            <h3>Length: {data.length}</h3>
            <h3>Location: {data.location}</h3>

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
