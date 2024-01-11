import React, { useState, useEffect } from "react";

function Locations({setComponent, setLocation}) {

    const [locations, setLocations] = useState([]);

    async function fetchData(url) {
      const response = await fetch(url);
      return response.json();
    }

    useEffect(() => {
        const getLocations = async () => {
          try {
            const locationsResponse = await fetchData("https://pokeapi.co/api/v2/location");
            setLocations(locationsResponse.results);
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
        <div className="locations flex-column">
            <h1>Welcome Traveler!</h1>
            <p>It's time to decide where you want to travel! But I warn you, there are dangers on the way!</p>
            <div className="locations-container">
              {locations.map((location, index) => (
                  <div onClick={ () => handleClick(location)} key={index}>
                    {location.name}
                  </div>
              ))}
            </div>
        </div>
    );
}
  
export default Locations;