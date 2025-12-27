import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import FitBounds from "../components/FitBounds";
import { fetchRoute, getCoOrdinates } from "../utils/graphhopper/functions";
import LocationSearchSuggestions from "../components/LocationSearchSuggestions";

function MapView() {
  //for input from user
  const [pickUpText, setPickUpText] = useState("");
  const [dropText, setDropText] = useState("");

  //for map setting in form of latitude and longitude
  const [pickUp, setPickUp] = useState(null);
  const [drop, setDrop] = useState(null);

  const [route, setRoute] = useState([]);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);

  // const [pickUpSuggestions, setPickUpSuggestions] = useState([]);
  // const [dropSuggestions, setDropSuggestions] = useState([]);

  //   a function  to set pickUp and drop locations
  async function handleSetLocation() {
    console.log("setLocation clicked");

    //converting text to cordinates
    const pickUpCoOrdinates = await getCoOrdinates(pickUpText);
    const dropCoOrdinates = await getCoOrdinates(dropText);

    if (pickUpCoOrdinates && dropCoOrdinates) {
      setPickUp(pickUpCoOrdinates);
      setDrop(dropCoOrdinates);
    } else {
      console.log("fetching pickUp or Drop co-ordinates failed");
      return;
    }

    const result = await fetchRoute(pickUpCoOrdinates, dropCoOrdinates);
    setRoute(result.route);
    setDistance(result.distance);
    setTime(result.time);
  }

  return (
    <div className="h-screen w-full">
      <div className="p-4 flex gap-2 mt-6">
        <LocationSearchSuggestions
          placeholder="Enter pickUp Location"
          value={pickUpText}
          onChange={setPickUpText}
          onSelectLocation={(text, coords) => {
            setPickUpText(text);
            setPickUp(coords);
          }}
        />
        <LocationSearchSuggestions
          placeholder="Enter Drop Location"
          value={dropText}
          onChange={setDropText}
          onSelectLocation={(text, coords) => {
            setDropText(text);
            setDrop(coords);
          }}
        />

        <Button onClick={handleSetLocation}>Set Location</Button>
      </div>
      <MapContainer
        center={[17.444, 78.391]} //setting center as hyderabad
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        {/* loads realworld  maps -- openstreetmap to convert palce to latitude and longitude */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {pickUp && drop && <FitBounds pickUp={pickUp} drop={drop} />}

        {pickUp && (
          <Marker position={pickUp}>
            <Popup>PickUp Location</Popup>
          </Marker>
        )}

        {drop && (
          <Marker position={drop}>
            <Popup>Drop Location</Popup>
          </Marker>
        )}

        {pickUp && drop && route.length > 0 && (
          <Polyline //drawing a line from pickUp to drop
            positions={route}
            weight={4}
            color="blue"
          />
        )}
      </MapContainer>
    </div>
  );
}

export default MapView;
