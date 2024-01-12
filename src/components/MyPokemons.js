import React, { useEffect, useState } from "react";

function MyPokemons({ setComponent, myPokemonsName, setMyPokemons }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyPokemonData = async (name) => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const dataJson = await response.json();
        return dataJson;
      } catch (error) {
        console.error('Hiba történt:', error);
        return null;
      }
    };

    const fetchData = async () => {
      const promises = myPokemonsName.map(getMyPokemonData);

      try {
        const myPokemonArray = await Promise.all(promises);
        setMyPokemons(myPokemonArray);
        setLoading(false);
        setComponent('PokemonSelector');
      } catch (error) {
        console.error('Hiba történt a fetch során:', error);
      }
    };

    fetchData();
  }, [myPokemonsName, setMyPokemons, setComponent]);

  return (
    <div className="mypokemons flex-column h-100 a-center j-center">
      {loading ? 'loading data...' : 'Data loaded!'}
    </div>
  );
}

export default MyPokemons;
