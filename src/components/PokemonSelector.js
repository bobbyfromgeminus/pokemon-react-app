function PokemonSelector({opponent, setComponent, myPokemons, setSelectedPokemon}) {

    const handleClick = (myPokemon) => {
        setSelectedPokemon(myPokemon);
        setComponent('BattleField');
    }

    return (
        <div className="pokemonselector">
            <h1>PokemonSelector</h1>
            <div>Ellenfél: {opponent.name}</div>
            <h1>Sajátjaim:</h1>
            {   myPokemons.map((myPokemon, index) => (
                    <div onClick={ () => handleClick(myPokemon)} key={index}>{myPokemon.name}</div>
                ))
            }
        </div>
    );
}
  
export default PokemonSelector;