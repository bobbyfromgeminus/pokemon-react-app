import React, { useState, useEffect } from "react";

function Locations({setComponent, setLocation}) {

    const [locations, setLocations] = useState([]);

    let landscapes = [
      {
        type: 'city',
        counter: 0
      },
      {
        type: 'league',
        counter: 0
      },
      {
        type: 'mine',
        counter: 0
      },
      {
        type: 'windworks',
        counter: 0
      },
      {
        type: 'forest',
        counter: 0
      },
      {
        type: 'ironworks',
        counter: 0
      },
      {
        type: 'coronet',
        counter: 0
      },
      {
        type: 'marsh',
        counter: 0
      },
      {
        type: 'ruins',
        counter: 0
      },
      {
        type: 'road',
        counter: 0
      },
      {
        type: 'path',
        counter: 0
      },
      {
        type: 'gate',
        counter: 0
      },
      {
        type: 'mountain',
        counter: 0
      },
      {
        type: 'cave',
        counter: 0
      },
      {
        type: 'temple',
        counter: 0
      }
    ];

    const setBackground = (locations) =>{
      let locationContainer = locations;
      locationContainer.forEach( (location) => {
        landscapes.forEach (landscape => {
          console.log(location.name, landscape.type);
          if (location.name.includes(landscape.type)) {
            landscape.counter++;
            console.log(`bg_${landscape.type}_${landscape.counter}`);
            location.cssClass = `bg_${landscape.type}_${landscape.counter}`;
          }
        })
      })
      setLocation(locationContainer);
    }

    setBackground(locations);

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
                  <div  className={location.cssClass} onClick={ () => handleClick(location)} key={index} id={location.name}>
                    <p>{location.name}</p>
                  </div>
              ))}
            </div>
        </div>
    );
}
  
export default Locations;