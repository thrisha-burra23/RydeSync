import { GRAPHHOPPER_API_KEY } from "./constants"

//function for getting co-ordinates from text
export async function getCoOrdinates(place) {
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

//function for finding route 
export async function fetchRoute(pickUp, drop) {
    console.log("fetch route function ")
    const response = await fetch(`https://graphhopper.com/api/1/route?key=${GRAPHHOPPER_API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                points: [
                    [pickUp[1], pickUp[0]],
                    [drop[1], drop[0]]
                ],
                vehicle: "car",
                points_encoded: false
            }),

        }
    );
    if (!response) {
        console.log("error in fetching data from api");
    }
    const data = await response.json();

    const path = data.paths[0];

    return {
        route: path.points.coordinates.map(
            ([lng, lat]) => [lat, lng]
        ),
        distance: path.distance,
        time: path.time
    }
}

//function to get suggestions while typing location
export async function fetchLocationSuggestions(place, setter) { //here setter is setSuggestions()
    if (place.length < 3) {
        setter([]);
        return
    }

    const response = await fetch(
        `https://nominatim.openstreetmap.org/search` +
        `?format=json` +
        `&q=${encodeURIComponent(place)}` +
        `&addressdetails=1` +
        `&limit=5` +
        `&countrycodes=in` +
        `&accept-language=en` +
        `&viewbox=78.20,17.60,78.60,17.30` + 
        `&bounded=1`
    );

    if(!response){
        console.log("suggestion fetching failed ")
        return;
    }

    const data=await response.json()

    setter(data)
}
