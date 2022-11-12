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
                <StyledLabel htmlFor="name">Fish Name: </StyledLabel>
                <input
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
                <input
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
                <input
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
                <input
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
                <StyledLabel htmlFor="name">Fish Image: </StyledLabel>
                <input type="file" id="file" name="file" />
                <DatePickerContainer>
                  <DatePicker
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

              <StyledButton type="submit">Submit</StyledButton>
            </StyledForm>
          </FormModal>
        ) : null}

        <CreateMarker />
      </MapContainer>
    </>
  );
}
const DatePickerContainer = styled.div`
  margin-top: 1rem;
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
