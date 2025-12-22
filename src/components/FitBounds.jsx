import React from 'react'
import { useMap } from 'react-leaflet'

const FitBounds = ({pickUp,drop}) => {
    const map=useMap();

    if(!pickUp || !drop){
        console.log("pickUp or drop not specified correctly")
        return null
    }
    map.fitBounds([pickUp,drop],{padding:[50,50]})

  return null
}

export default FitBounds