import styled from "styled-components";
import Link from "next/link";

export default function List({ fetchedData }) {
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
