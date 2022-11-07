import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

export default function Map({ setLatLng, fetchedData }) {
  const [position, setPosition] = useState([
    58.034125450605316, 7.454502477686363,
  ]);

  function ClickHandler() {
    const map = useMapEvents({});
    map.on("click", function (e) {
      setLatLng([e.latlng.lat, e.latlng.lng]);

      L.circle([e.latlng.lat, e.latlng.lng], { radius: 200 })
        .addTo(map)
        .bindPopup("I'm a Popup!")
        .openPopup();
    });
    return null;
  }

  function CreateMarker() {
    const map = useMapEvents({});

    useEffect(() => {
      fetchedData.forEach((element) => {
        L.circle([element.coords[0], element.coords[1]], { radius: 200 })
          .addTo(map)
          .bindPopup(
            `Name: ${element.name} <br> Weight: ${element.weight}kg <br> Length: ${element.length}cm`
          )
          .openPopup();
      });
    }, [fetchedData]);
  }

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

        <CreateMarker />
      </MapContainer>
    </>
  );
}
