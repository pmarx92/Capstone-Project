import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { nanoid } from "nanoid";
import { useEffect } from "react";

export default function Map({ markerPosition, setMarkerPosition }) {
  const [position, setPosition] = useState([
    58.034125450605316, 7.454502477686363,
  ]);

  function ClickHandler() {
    const map = useMapEvents({});
    map.on("click", function (e) {
      const newMarker = {
        id: nanoid(),
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };

      L.circle([e.latlng.lat, e.latlng.lng], { radius: 200 })
        .addTo(map)
        .bindPopup("I'm a Popup!")
        .openPopup();
      setMarkerPosition([...markerPosition].concat(newMarker));
    });
    return null;
  }

  function CreateMarker() {
    const map = useMapEvents({});
    useEffect(() => {
      markerPosition.map((marker) => {
        L.circle([marker.lat, marker.lng], { radius: 200 })
          .addTo(map)
          .bindPopup("I'm a Popup!")
          .openPopup();
      });
    }, []);
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
