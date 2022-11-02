import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { nanoid } from "nanoid";
import Map from "../../components/map/index";

export default function Add({
  fishList,
  setFishList,
  startDate,
  setStartDate,
  fishName,
  setFishName,
  fishWeight,
  setFishWeight,
  fishLength,
  setFishLength,
  fishLocation,
  setFishLocation,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const newFish = {
      id: nanoid(),
      fishName: fishName,
      fishWeight: +fishWeight,
      fishLength: +fishLength,
      location: fishLocation,
      date: startDate.toISOString(),
    };
    setFishList([...fishList].concat(newFish));
  };

  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <Map />
        <StyledField>
          <StyledLabel htmlFor="name">Fish Name: </StyledLabel>
          <input
            type="text"
            id="name"
            name="name"
            minLength="3"
            maxLength="15"
            placeholder="z.B. Lachs"
            onChange={(e) => setFishName(e.target.value)}
            required
          />
          <StyledLabel htmlFor="weight">Weight in kg: </StyledLabel>
          <input
            type="number"
            id="weight"
            name="weight"
            step="0.10"
            min="0"
            max="25"
            placeholder="z.B. 12.0"
            onChange={(e) => setFishWeight(e.target.value)}
            required
          />
          <StyledLabel htmlFor="length">Length in Meter: </StyledLabel>
          <input
            type="number"
            id="length"
            name="length"
            placeholder="z.B. 3"
            step="0.10"
            min="0"
            max="10"
            onChange={(e) => setFishLength(e.target.value)}
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
            onChange={(e) => setFishLocation(e.target.value)}
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

        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </div>
  );
}

const DatePickerContainer = styled.div`
  margin-top: 0.7rem;
  width: 100%;
`;
const StyledLabel = styled.label`
  margin: 0.7rem 0;
`;
const StyledForm = styled.form`
  width: 80%;
  margin: 5rem auto;
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
