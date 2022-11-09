import "react-datepicker/dist/react-datepicker.css";
import Map from "../../components/map/index";

import { useState } from "react";

export default function Add({ dataFromAPI }) {
  const [latlng, setLatLng] = useState([]);

  return (
    <div>
      <Map setLatLng={setLatLng} dataFromAPI={dataFromAPI} latlng={latlng} />
    </div>
  );
}
