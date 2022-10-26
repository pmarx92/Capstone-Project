import styled from "styled-components";

export default function List({ fishList }) {
  return (
    <div>
      <h1>This is the List Page - Under Construction</h1>
      <Container>
        {fishList.map((fish) => (
          <Card key={fish.id}>
            <StyledParagraph>Name: {fish.fishname}</StyledParagraph>
            <StyledParagraph>Weight: {fish.fishweight}kg</StyledParagraph>
            <StyledParagraph>Length: {fish.fishlength}m</StyledParagraph>
            <StyledParagraph>Location: {fish.location}</StyledParagraph>
            <StyledParagraph>Date: {fish.date}</StyledParagraph>
          </Card>
        ))}
      </Container>
    </div>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const StyledParagraph = styled.p`
  padding: 0.1rem;
`;
