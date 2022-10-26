import styled from "styled-components";

export default function List({ fishList }) {
  return (
    <div>
      <h1>This is the List Page - Under Construction</h1>
      {fishList.map((fish) => (
        <Card key={fish.id}>
          {console.log(fish.weight)}
          <p>{fish.fishname}</p>
          <p>{fish.fishweight}kg</p>
          <p>{fish.fishlength}m</p>
          <p>{fish.location}</p>
          {/* <p>{fish.date}</p> */}
        </Card>
      ))}
    </div>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  box-shadow: 0 0 10px black;
  padding: 1rem;
  margin: 1rem;

  &:hover {
    margin: 1.1rem;
  }
`;
