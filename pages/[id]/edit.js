import "react-datepicker/dist/react-datepicker.css";
import EditMap from "../../components/map/editMap/index";

export default function EditCard({ setLatLng, latlng }) {
  return (
    <div>
      <EditMap setLatLng={setLatLng} latlng={latlng} />
    </div>
  );
}
