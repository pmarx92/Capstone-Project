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
  };

  return (
    <div>
      <h1>This is the Add Page - Under Construction</h1>
      <StyledForm onSubmit={handleSubmit}>
        <StyledField>
          <StyledInput htmlFor="name">Fish Name: </StyledInput>
          <input type="text" id="name" name="name" required></input>
          <StyledInput htmlFor="weight">Weight: </StyledInput>
          <input type="number" id="weight" name="weight" required></input>
          <StyledInput htmlFor="Length">Length: </StyledInput>
          <input type="number" id="length" name="length" required></input>
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
