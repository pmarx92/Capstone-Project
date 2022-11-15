import { MapContainer, TileLayer } from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import FormModal from "../formModal";
import styled from "styled-components";

import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Map({ latlng, setLatLng }) {
  const [position, setPosition] = useState([
    58.034125450605316, 7.454502477686363,
  ]);
  const [opened, setOpened] = useState(false);
  const { pathname } = useRouter();
  const [startDate, setStartDate] = useState(new Date());

  const [fishName, setFishName] = useState("");
  const [fishWeight, setFishWeight] = useState();
  const [fishLength, setFishLength] = useState();
  const [fishLocation, setFishLocation] = useState("");

  const [APIData, setAPIData] = useState([]);
  const [APICoords, setAPICoords] = useState([]);

  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

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

  const sendToServer = async () => {
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
  };

  function ClickHandler() {
    const map = useMapEvents({});

    !opened
      ? map.on("click", function (e) {
          setLatLng([e.latlng.lat, e.latlng.lng]);
          L.circle([e.latlng.lat, e.latlng.lng], { radius: 200 }).addTo(map);
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

  function CreateMarker() {
    const map = useMapEvents({});

    useEffect(() => {
      APIData.forEach((element) => {
        L.circle([element.coords[0], element.coords[1]], { radius: 200 })
          .addTo(map)
          .bindPopup(
            `Name: ${element.name} <br> Weight: ${element.weight}kg <br> Length: ${element.length}cm`
          )
          .openPopup();
      });
    }, []);
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
        ></TileLayer>
        {opened ? (
          <FormModal
            open={opened}
            close={() => setOpened(!opened)}
            onChange={handleOnChange}
          >
            <StyledForm onSubmit={submitForm} onChange={handleSubmit}>
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
                <StyledInput type="file" id="file" name="file" />
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

        <CreateMarker />
      </MapContainer>
    </>
  );
}
const EditBtn = styled.button`
  font-size: large;
  position: absolute;
  border-radius: 25px;
  border: 0;
  width: 35%;
  bottom: -15px;
  right: 10px;
  color: var(--white);
  background-color: var(--backgroundColor-green);
  padding: 0.6rem 1.5rem;

  &:hover {
    box-shadow: 0 0 10px var(--backgroundColor-dark);
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
  font-size: 20px;
  margin: 0.7rem 0;
`;
const StyledForm = styled.form``;

const StyledField = styled.fieldset`
  gap: 3px;
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
  margin-top: 2rem;
`;
