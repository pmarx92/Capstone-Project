import { MapContainer, TileLayer } from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import EditFormModal from "../../editFormModal/index";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Map({ latlng, setLatLng }) {
  const [position, setPosition] = useState([
    58.034125450605316, 7.454502477686363,
  ]);
  const [opened, setOpened] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [editfishName, setEditFishName] = useState("");
  const [editfishWeight, setEditFishWeight] = useState();
  const [editfishLength, setEditFishLength] = useState();
  const [editfishLocation, setEditFishLocation] = useState("");
  const [APIData, setAPIData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const router = useRouter();

  async function fetchAPI() {
    const res = await fetch("/api/formdata");
    const data = await res.json();
    const fetchedAPIData = data.data;
    setAPIData(fetchedAPIData);

    fetchedAPIData.map((data) => {
      setPrevData(data);
    });

    setLatLng(
      fetchedAPIData.map((data) => {
        data.coords;
      })
    );
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  const sendToServer = async () => {
    const res = await fetch(`/api/formdata/${router.query.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editfishName || prevData.name,
        weight: editfishWeight || prevData.weight,
        length: editfishLength || prevData.length,
        location: editfishLocation || prevData.location,
        date: startDate.toISOString(),
        coords: latlng || prevData.coords,
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

  const handleSubmit = () => {
    setOpened(!opened);
    setEditFishName("");
    setEditFishWeight("");
    setEditFishLength("");
    setEditFishLocation("");
    sendToServer();
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
          <EditFormModal open={opened} close={() => setOpened(!opened)}>
            <StyledForm onSubmit={handleSubmit}>
              <StyledField>
                <StyledLabel htmlFor="name">Caught fish: </StyledLabel>
                <StyledInput
                  type="text"
                  id="name"
                  name="name"
                  minLength="3"
                  maxLength="15"
                  placeholder="z.B. Lachs"
                  onChange={(e) => setEditFishName(e.target.value)}
                  pattern="^(?!^ +$)([\w -&]+)$"
                  defaultValue={prevData.name}
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
                  onChange={(e) => setEditFishWeight(e.target.value)}
                  defaultValue={prevData.weight}
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
                  onChange={(e) => setEditFishLength(e.target.value)}
                  defaultValue={prevData.length}
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
                  onChange={(e) => setEditFishLocation(e.target.value)}
                  pattern="^(?!^ +$)([\w -&]+)$"
                  defaultValue={prevData.location}
                  required
                />
                <DatePickerContainer>
                  <Test
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
              <ButtonContainer>
                <StyledButton type="submit">Update</StyledButton>
              </ButtonContainer>
            </StyledForm>
          </EditFormModal>
        ) : null}

        <CreateMarker />
      </MapContainer>
    </>
  );
}
const DatePickerContainer = styled.div`
  margin-top: 1rem;
`;
const Test = styled(DatePicker)`
  border: 0;
  border-radius: 20px;
  padding: 0.7rem;
  box-shadow: 3px 5px var(--backgroundColor-green);
  background-color: var(--white);

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
