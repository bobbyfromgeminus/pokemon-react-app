import React, { useEffect } from "react";

function MyPokemons({setComponent, myPokemonsName, setMyPokemons}) {

    // Lekérjük a saját pokemonjaink adatait és eltároljuk a myPokemons state-ben
    useEffect(() => {
        let myPokemonArray = [];
  
        const getMyPokemonData = async (name) => {
          try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const dataJson = await response.json();
            myPokemonArray.push(dataJson);
          } catch (error) {
            console.error('Hiba történt:', error);
          }
        };
        myPokemonsName.forEach( (name) => {
          getMyPokemonData(name);
        });
        setMyPokemons(myPokemonArray);
        setTimeout(()=>setComponent('PokemonSelector'), 300);
    }, [myPokemonsName, setMyPokemons, setComponent]);



    return (
        <div className="mypokemons flex-column h-100 a-center j-center">
            loading data...
        </div>
    );

}
  
export default MyPokemons;