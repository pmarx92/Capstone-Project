import styled from "styled-components";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Add() {
  const [startDate, setStartDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
    console.log(e.target.weight.value);
    console.log(e.target.length.value);
    console.log(e.target.location.value);

    console.log(startDate);
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
          <input type="text" id="location" name="location" required />

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
        </StyledField>

        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </div>
  );
}

const StyledInput = styled.label`
  padding: 0.3rem 0;
`;
const StyledForm = styled.form`
  width: 70%;
  margin: 0 auto;
  background-color: red;
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
