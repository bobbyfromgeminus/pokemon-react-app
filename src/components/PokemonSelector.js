import PokemonCard from "./PokemonCard";

function PokemonSelector({opponent, setComponent, myPokemons, setSelectedPokemon}) {

    const handleClick = (myPokemon) => {
        setSelectedPokemon(myPokemon);
        setComponent('BattleField');
    }

    return (
        <div className="pokemonselector">
            <h1>PokemonSelector</h1>
            <PokemonCard pokemon={opponent}/>
            <h1>Pokemonjaim</h1>
            <div className="card-container">
                {   myPokemons.map((myPokemon, index) => (
                        <PokemonCard handleClick={handleClick} key={index} pokemon={myPokemon}/>
                    ))
                }
            </div>
        </div>
    );
}
  
export default PokemonSelector;