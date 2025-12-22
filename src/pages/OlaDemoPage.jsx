import React, { useEffect, useRef } from "react";
import { OlaMaps } from "olamaps-web-sdk";

const OlaDemoPage = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const olaMaps = new OlaMaps({
      apiKey: import.meta.env.VITE_OLA_MAPS_KEY, // use env var
    });

    olaMaps.init({
      style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      container: mapRef.current,
      center: [77.61648476788898, 12.931423492103944],
      zoom: 15,
    });
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
};

export default OlaDemoPage;
