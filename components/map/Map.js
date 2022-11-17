import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { useMapEvents } from "react-leaflet/hooks";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import "leaflet/dist/leaflet.css";
import FormModal from "../formModal";
import styled from "styled-components";
import BeatLoader from "react-spinners/BeatLoader";
import Modal from "../modal/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";

export default function Map({ latlng, setLatLng }) {
  const [position, setPosition] = useState([
    58.034125450605316, 7.454502477686363,
  ]);
  const { pathname } = useRouter();

  const [opened, setOpened] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const [fishName, setFishName] = useState("");
  const [fishWeight, setFishWeight] = useState();
  const [fishLength, setFishLength] = useState();
  const [fishLocation, setFishLocation] = useState("");

  const [APIData, setAPIData] = useState([]);
  const [APICoords, setAPICoords] = useState([]);

  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  const [loading, setLoading] = useState(false);

  async function fetchAPI() {
    const res = await fetch("/api/formdata");
    const data = await res.json();
    const allData = data.data;
    setAPIData(allData);

    allData.map((data) => {
      setAPICoords(data.coords);
    });
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  const locationOnIcon = L.divIcon({
    html: `<svg width="38px" height="38px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="var(--backgroundColor-green)"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
    className: "",
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
  });

  const sendToServer = async () => {
    setLoading(true);
    const res = await fetch("/api/formdata", {
      method: "POST",
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
        cloudinarySrc: imageSrc,
      }),
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);
    setConfirmed(true);
  };

  function ClickHandler() {
    const map = useMapEvents({});

    !opened
      ? map.on("click", function (e) {
          setLatLng([e.latlng.lat, e.latlng.lng]);
          map.off("click");
          setOpened(!opened);
          map.dragging.disable();
          map.touchZoom.disable();
          map.doubleClickZoom.disable();
          map.scrollWheelZoom.disable();
          map.boxZoom.disable();
          map.keyboard.disable();
        })
      : null;
    return null;
  }

  const submitForm = () => {
    setOpened(!opened);
    setFishName("");
    setFishWeight("");
    setFishLength("");
    setFishLocation("");
    sendToServer();
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();
    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "testUploads");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/diqguycjt/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
    setImageSrc(data.secure_url);
    setUploadData(data);
  };

  const handleOnChange = (e) => {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      {confirmed ? (
        <Modal>
          <ModalContainer>
            <ModalPara>Your fish has successfully added.</ModalPara>
            <ButtonContainer>
              <ModalButtonDark onClick={() => setConfirmed(false)}>
                Back
              </ModalButtonDark>
              <ModalButtonGreen>
                <Link aria-label="Browse to Home" href="/List" passHref>
                  <Anchor active={pathname === "/List"}>List Page</Anchor>
                </Link>
              </ModalButtonGreen>
            </ButtonContainer>
          </ModalContainer>
        </Modal>
      ) : null}
      {loading ? (
        <Container>
          <BeatLoader color="green" />
        </Container>
      ) : (
        <MapContainer
          center={position}
          zoom={11}
          scrollWheelZoom={true}
          style={{
            width: "70%",
            height: "36rem",
            borderRadius: "40px",
            boxShadow: "0 0 10px black",
            margin: "2rem auto",
            zIndex: "1",
          }}
        >
          <ClickHandler />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {opened ? (
            <FormModal
              open={opened}
              close={() => setOpened(!opened)}
              onChange={handleOnChange}
            >
              <StyledForm onSubmit={submitForm}>
                <StyledField>
                  <StyledLabel htmlFor="name">Caught fish: </StyledLabel>
                  <StyledInput
                    type="text"
                    id="name"
                    name="name"
                    minLength="3"
                    maxLength="15"
                    placeholder="z.B. Lachs"
                    onChange={(e) => setFishName(e.target.value)}
                    pattern="^(?!^ +$)([\w -&]+)$"
                    required
                  />
                  <StyledLabel htmlFor="weight">Weight in kg: </StyledLabel>
                  <StyledInput
                    type="number"
                    id="weight"
                    name="weight"
                    step="0.10"
                    min=".50"
                    max="25"
                    placeholder="z.B. 0.70"
                    onChange={(e) => setFishWeight(e.target.value)}
                    required
                  />
                  <StyledLabel htmlFor="length">Length in cm: </StyledLabel>
                  <StyledInput
                    type="number"
                    id="length"
                    name="length"
                    placeholder="z.B. 10"
                    step="10"
                    min="10"
                    max="200"
                    onChange={(e) => setFishLength(e.target.value)}
                    required
                  />
                  <StyledLabel htmlFor="location">Location: </StyledLabel>
                  <StyledInput
                    type="text"
                    id="location"
                    name="location"
                    minLength="3"
                    maxLength="15"
                    placeholder="z.B. Kristiansand"
                    onChange={(e) => setFishLocation(e.target.value)}
                    pattern="^(?!^ +$)([\w -&]+)$"
                    required
                  />
                  <StyledLabel htmlFor="name">Upload Image: </StyledLabel>
                  <StyledForm onChange={handleSubmit}>
                    <StyledInput type="file" id="file" name="file" />
                  </StyledForm>
                  <DatePickerContainer>
                    <Test
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="time"
                      dateFormat="h:mm aa d MMMM, yyyy "
                    />
                  </DatePickerContainer>
                </StyledField>

                <ButtonContainer>
                  <StyledButton type="submit">Save</StyledButton>
                </ButtonContainer>
              </StyledForm>
            </FormModal>
          ) : null}

          {APIData.map((element) => {
            return (
              <Marker
                position={(element.coords, element.coords)}
                icon={locationOnIcon}
              >
                <Popup>
                  <p>Name: {element.name}</p>
                  <p>Weight: {element.weight}kg</p>
                  <p>Length: {element.length}cm</p>
                  <p>Location: {element.location}</p>
                  <p>Date: {element.date}</p>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      )}
    </>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;
const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ModalPara = styled.p``;

const ModalButtonGreen = styled.button`
  font-size: large;
  border-radius: 25px;
  margin-top: 1rem;
  border: 0;
  width: 150px;
  color: var(--white);
  background-color: var(--backgroundColor-green);
  padding: 0.6rem 2rem;

  &:hover {
    box-shadow: 3px 5px var(--backgroundColor-dark);
  }
`;
const ModalButtonDark = styled.button`
  font-size: large;
  border-radius: 25px;
  margin-top: 1rem;
  width: 150px;
  border: 0;
  color: var(--white);
  background-color: var(--backgroundColor-dark);
  padding: 0.6rem 1.5rem;

  &:hover {
    box-shadow: 3px 5px var(--backgroundColor-green);
  }
`;

const DatePickerContainer = styled.div`
  margin-top: 1rem;
`;
const Test = styled(DatePicker)`
  border: 0;
  border-radius: 20px;
  padding: 0.7rem;
  box-shadow: 3px 5px var(--backgroundColor-green);
  background-color: var(--white);
  width: 75%;

  &:hover {
    box-shadow: 3px 5px var(--backgroundColor-dark);
  }
`;
const StyledInput = styled.input`
  border: 0;
  border-radius: 20px;
  padding: 0.7rem;
  box-shadow: 3px 5px var(--backgroundColor-green);
  background-color: var(--white);

  &:hover {
    box-shadow: 3px 5px var(--backgroundColor-dark);
  }
`;
const StyledLabel = styled.label`
  font-size: 18px;
  margin: 0.7rem 0;
`;
const StyledForm = styled.form``;

const StyledField = styled.fieldset`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border: 0;
`;
const StyledButton = styled.button`
  font-size: large;
  border-radius: 25px;
  border: 0;
  color: var(--white);
  background-color: var(--backgroundColor-dark);
  padding: 0.6rem 1.5rem;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0rem;
  gap: 5px;
`;
const Anchor = styled.a`
  text-decoration: none;
  color: inherit;

  &:hover {
    cursor: pointer;
  }
`;
