import React, { useEffect } from "react";
import PokemonCard from "./PokemonCard";

function Location({setComponent, location, setOpponent, opponent}) {

    async function fetchData(url) {
        const response = await fetch(url);
        return response.json();
    }
      
    async function getRandomItemFromArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    useEffect(() => {

            async function fetchOpponentData() {
                try {
                // Rendelkezésünkre áll egy egyszerű objektum, amiből tudjuk a Location nevét és urljét
                // Lekérjük a bővebb adatait, amiből nekünk az areas kell.
                const locationResponse = await fetchData(location.url);
                const areas = locationResponse.areas;
            
                // A Location Area-kból egyet random választunk
                const randomArea = await getRandomItemFromArray(areas);
            
                // A random area url-jével lehívjuk az adatait
                if (randomArea && randomArea.url) {
                    const areaResponse = await fetchData(randomArea.url);
                    const opponents = areaResponse.pokemon_encounters;
            
                    // A random areá-n elérhető pokemonok közül random választunk egyet
                    const randomOpponent = await getRandomItemFromArray(opponents);
            
                    if (randomOpponent && randomOpponent.pokemon && randomOpponent.pokemon.url) {
                    // A random választott pokemon adatait lehívjuk
                    const opponentJson = await fetchData(randomOpponent.pokemon.url);
            
                    // A kapott pokemon adatokat átadjuk az App opponent state-jének
                    setOpponent(opponentJson);
                    }
                }
                } catch (error) {
                console.error('Hiba történt:', error);
                }
            }

            fetchOpponentData();
        }, [location, setOpponent]
    );

    const handleClick = (pokemon) => {
        alert(`${pokemon.name} says: Wroaaarh!!!`);
    }

    return (
        <div className="location flex-column">
            <h1>{location.name}</h1>
            
            {
                !opponent.empty ? (
                    <div className="flex-column">
                        <h2>I think we have a challenger...</h2>
                        <br/>
                        <PokemonCard handleClick={handleClick} pokemon={opponent}/>
                        <button onClick={() => {setComponent('MyPokemons')}}>Choose one of your Pokemon!</button>
                    </div>
                ) : (
                    <button onClick={() => {setComponent('Locations')}}>Unfortunately, there is nothing to see here. Choose another location!</button>
                )
            }
        </div>
    )
}
  
export default Location;