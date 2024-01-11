import PokemonCard from "./PokemonCard";

function PokemonSelector({opponent, setComponent, myPokemons, setSelectedPokemon}) {

    const handleClick = (myPokemon) => {
        setSelectedPokemon(myPokemon);
        setComponent('BattleField');
    }

    return (
        <div className="pokemonselector flex-column">
            <h2>Opponent</h2>
            <PokemonCard pokemon={opponent}/>
            <br/>
            <br/>
            <h2>Choose a Pokémon to defeat {opponent.name}!</h2>
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