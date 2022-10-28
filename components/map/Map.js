import { MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import styled from "styled-components";

export default function Map() {
  return (
    <>
      <MapContainer
        center={[58.034125450605316, 7.454502477686363]}
        zoom={11}
        scrollWheelZoom={true}
        onClick={(event) => getCoord(event.latlng)}
        style={{
          width: "70%",
          height: "37rem",
          borderRadius: "40px",
          boxShadow: "0 0 10px black",
          margin: "3rem auto",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></TileLayer>
      </MapContainer>
    </>
  );
}

const Headline = styled.h1`
  margin-top: 3rem;
  text-align: center;
`;
