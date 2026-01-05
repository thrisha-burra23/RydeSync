import { useState } from "react";
import { fetchLocationSuggestions } from "../utils/graphhopper/functions";

function LocationSearch({ placeholder, value, onChange, onSelectLocation }) {
  const [suggestions, setSuggestions] = useState([]);

  return (
    <div style={{ position: "relative", width: "300px" }}>
      {/* Input */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          const text = e.target.value;
          onChange(text);
          fetchLocationSuggestions(text, setSuggestions);
        }}
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #ccc",
            borderTop: "none",
            zIndex: 1000,
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((place) => {
            const label = place.display_name.split(",").slice(0, 3).join(", ");

            return (
              <div
                key={place.place_id}
                onClick={() => {
                  onChange(label);
                  onSelectLocation(label, [
                    parseFloat(place.lat),
                    parseFloat(place.lon),
                  ]);
                  setSuggestions([]);
                }}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                }}
                onMouseDown={(e) => e.preventDefault()} // prevents input blur
              >
                {label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LocationSearch;
