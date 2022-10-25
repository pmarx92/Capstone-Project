import styled from "styled-components";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  setLocalStorage,
  loadLocalStorage,
} from "../../components/LocalStorage";
import { nanoid } from "nanoid";

export default function Add() {
  const [startDate, setStartDate] = useState(new Date());
  const [fishList, setFishList] = useState(
    loadLocalStorage("localfFishList") ?? []
  );

  useEffect(() => {
    setLocalStorage("localfFishList", fishList);
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFish = {
      id: nanoid(),
      fishname: e.target.name.value,
      fishweight: e.target.weight.value,
      fishlength: e.target.length.value,
      location: e.target.location.value,
      date: startDate,
    };
    setFishList([...fishList].concat(newFish));
  };

  // Test Function so you can test the LocalStorage easy
  const localStorageTestFunction = () => {
    console.log(fishList);
  };

  return (
    <div>
      <h1>This is the Add Page - Under Construction</h1>
      <StyledForm onSubmit={handleSubmit}>
        <StyledField>
          <StyledInput htmlFor="name">Fish Name: </StyledInput>
          <input
            type="text"
            id="name"
            name="name"
            minLength="5"
            maxLength="15"
            placeholder="z.B. Lachs"
            required
          />
          <StyledInput htmlFor="weight">Weight in kg: </StyledInput>
          <input
            type="number"
            id="weight"
            name="weight"
            step="0.10"
            min="0"
            max="100"
            placeholder="z.B. 12.0kg"
            required
          />
          <StyledInput htmlFor="length">Length in Meter: </StyledInput>
          <input
            type="number"
            id="length"
            name="length"
            placeholder="z.B. 3m"
            step="0.10"
            min="0"
            max="100"
            required
          />
          <StyledInput htmlFor="location">Location: </StyledInput>
          <input
            type="text"
            id="location"
            name="location"
            minLength="5"
            maxLength="15"
            placeholder="z.B. Kristiansand"
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
              dateFormat="d MMMM, yyyy h:mm aa"
              withPortal
            />
          </DatePickerContainer>
        </StyledField>

        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>

      <button onClick={localStorageTestFunction}>
        Click me to test the LocalStorage
      </button>
    </div>
  );
}
const DatePickerContainer = styled.div`
  margin-top: 0.7rem;
  width: 100%;
`;
const StyledInput = styled.label`
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
