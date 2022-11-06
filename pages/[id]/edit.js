import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { nanoid } from "nanoid";
import Map from "../../components/map/index";
import Modal from "../../components/modal/index";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function EditCard({
  startDate,
  fishName,
  setStartDate,
  fishWeight,
  setFishName,
  fishLength,
  setFishWeight,
  setFishLength,
  fishLocation,
  setFishLocation,
  setLatLng,
  latlng,
  fetchedData,
}) {
  const [opened, setOpened] = useState(false);
  const { pathname } = useRouter();
  const router = useRouter();

  const sendToServer = async () => {
    const res = await fetch(`/api/formdata/${router.query.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fishName,
        weight: fishWeight,
        length: fishLength,
        location: fishLocation,
        date: startDate.toISOString(),
        coords: latlng,
      }),
    });
  };

  const handleSubmit = (e) => {
    setOpened(!opened);
    setFishName("");
    setFishWeight("");
    setFishLength("");
    setFishLocation("");
    sendToServer();
  };

  return (
    <div>
      <Map setLatLng={setLatLng} latlng={latlng} fetchedData={fetchedData} />
      <StyledForm onSubmit={handleSubmit}>
        {opened ? (
          <Modal open={opened} close={() => setOpened(!opened)}>
            <p>You&apos;re input has been added to the List!</p>
            <Link aria-label="Browse the list page" href="/List" passHref>
              <Anchor active={pathname === "../List"}>
                <p>Move to the List!</p>
              </Anchor>
            </Link>
          </Modal>
        ) : null}

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
            pattern="[^\s]+"
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
            oonChange={(e) => setFishWeight(e.target.value)}
            required
          />
          <StyledLabel htmlFor="length">Length in cm: </StyledLabel>
          <input
            type="number"
            id="length"
            name="length"
            placeholder="z.B. 3"
            step="0.10"
            min="0.3"
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

        <StyledButton type="submit">Update</StyledButton>
      </StyledForm>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const res = await fetch(`http://localhost:3000/api/formdata/${ctx.query.id}`);
  const data = await res.json();

  return {
    props: { data },
  };
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
  margin-bottom: 7rem;
  padding: 0.3rem;
`;
const Anchor = styled.a`
  text-decoration: none;
  transition: 0.9s;
  padding: 1.4em;
  margin: 1rem auto;
`;
