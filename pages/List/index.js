import styled from "styled-components";
import DatePicker from "react-datepicker";
import { useState } from "react";

export default function List({
  fishList,
  setFishList,
  startDate,
  setStartDate,
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
              fishName: editFishName,
              fishWeight: editFishWeight,
              fishLength: editFisLength,
              location: editFishLocation,
              lat: fish.lat,
              lng: fish.lng,
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
      <Container>
        {fishList.map((fish) => (
          <Card key={fish.id}>
            {storedId === fish.id ? (
              <button onClick={() => editCard(fish.id)}>Submit Edit</button>
            ) : (
              <StyledBtn onClick={() => setStoredId(fish.id)}>Edit</StyledBtn>
            )}
            <StyledBtn onClick={() => deleteCard(fish.id)}>x</StyledBtn>
            {storedId === fish.id ? (
              <StyledField>
                <StyledLabel htmlFor="name">Fish Name: </StyledLabel>
                <input
                  type="text"
                  id="name"
                  name="name"
                  minLength="3"
                  maxLength="15"
                  placeholder="z.B. Lachs"
                  onChange={(e) => setEditFishName(e.target.value)}
                  pattern="^(?!^ +$)([\w -&]+)$"
                  required
                />
                <StyledLabel htmlFor="weight">Weight in kg: </StyledLabel>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  step="0.10"
                  min=".50"
                  max="1.5"
                  placeholder="z.B. 0.70"
                  onChange={(e) => setEditFishWeight(e.target.value)}
                  required
                />
                <StyledLabel htmlFor="length">Length in Meter: </StyledLabel>
                <input
                  type="number"
                  id="length"
                  name="length"
                  placeholder="z.B. 3"
                  step="0.10"
                  min="0.3"
                  max="10"
                  onChange={(e) => setEditFishLength(e.target.value)}
                  required
                />
                <StyledLabel htmlFor="location">Location: </StyledLabel>
                <input
                  type="text"
                  id="location"
                  name="location"
                  minLength="5"
                  maxLength="15"
                  placeholder="z.B. Kristiansand"
                  onChange={(e) => setEditFishLocation(e.target.value)}
                  pattern="^(?!^ +$)([\w -&]+)$"
                  required
                />
                <DatePickerContainer>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="h:mm aa d MMMM, yyyy "
                    withPortal
                  />
                </DatePickerContainer>
              </StyledField>
            ) : (
              <div>
                <StyledParagraph>Name: {fish.fishName}</StyledParagraph>
                <StyledParagraph>Weight: {fish.fishWeight}kg</StyledParagraph>
                <StyledParagraph>Length: {fish.fishLength}m</StyledParagraph>
                <StyledParagraph>Location: {fish.location}</StyledParagraph>
                <StyledParagraph>Date: {fish.date}</StyledParagraph>
              </div>
            )}
          </Card>
        ))}
      </Container>
    </div>
  );
}
const StyledBtn = styled.button`
  width: 20%;
`;
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
const DatePickerContainer = styled.div`
  margin-top: 0.7rem;
  width: 100%;
`;
const StyledLabel = styled.label`
  margin: 0.7rem 0;
`;
const StyledForm = styled.form`
  width: 80%;
  margin: 0 auto;
  padding: 1rem;
`;
const StyledField = styled.fieldset`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const StyledButton = styled.button`
  display: flex;
  margin: 1rem auto;
  padding: 0.3rem;
`;
