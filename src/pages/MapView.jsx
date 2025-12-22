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
import { Input } from "@/components/ui/input";
import FitBounds from "../components/FitBounds";

function MapView() {
  //for input from user
  const [pickUpText, setPickUpText] = useState("");
  const [dropText, setDropText] = useState("");

  //for map setting in form of latitude and longitude
  const [pickUp, setPickUp] = useState(null);
  const [drop, setDrop] = useState(null);

  //function for getting co-ordinates from text
  async function getCoOrdinates(place) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${place}`
    );
    if (!response.ok) {
      console.log("fetching data from  openStreetMap api failed ");
    }
    const data = await response.json();
    console.log(data);
    if (data.length === 0) {
      console.log("location not found");
      return null;
    }

    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  }

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
    }
  }

  return (
    <div className="h-screen w-full">
      <div className="p-4 flex gap-2 mt-6">
        <Input
          placeholder="Enter PickUp location"
          type="text"
          value={pickUpText}
          onChange={(event) => setPickUpText(event.target.value)}
        />
        <Input
          placeholder="Enter Drop location"
          type="text"
          value={dropText}
          onChange={(event) => setDropText(event.target.value)}
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

        {/* component  set bounds so that map zoom exact to pick and drop locations */}
        <FitBounds pickUp={pickUp} drop={drop} />

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

        {pickUp && drop && (
          <Polyline //drawing a line from pickUp to drop
            positions={[pickUp, drop]}
            weight={4}
            color="blue"
          />
        )}
      </MapContainer>
    </div>
  );
}

export default MapView;
