import React, { useState, useEffect } from "react";

function Locations({setComponent, setLocation}) {

    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const getLocations = async () => {
          try {
            const response = await fetch("https://pokeapi.co/api/v2/location");
            const dataJson = await response.json();
            setLocations(dataJson.results);
          } catch (error) {
            console.error('Hiba történt:', error);
          }
        };
      
        getLocations();
    }, []);

    const handleClick = (location) => {
        setLocation(location);
        setComponent('Location');
    }

    return (
        <div className="locations">
            <h1>Locations</h1>
            {locations.map((location, index) => (
                <div onClick={ () => handleClick(location)} key={index}>{location.name}</div>
            ))}
        </div>
    );
}
  
export default Locations;