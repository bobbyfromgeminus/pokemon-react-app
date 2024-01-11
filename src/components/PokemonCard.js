function PokemonCard({pokemon, handleClick}) {

    return (
        <div className="pokemon-card" onClick={ () => handleClick(pokemon)}>
            <h2>{pokemon.name}</h2>
            <div className="img" style={{ backgroundImage: `url("${pokemon.sprites.other.showdown.front_default}")` }}/>
            <p>HP: {pokemon.stats[0].base_stat}</p>
            <p>Attack: {pokemon.stats[1].base_stat}</p>
            <p>Defense: {pokemon.stats[2].base_stat}</p>
        </div>
    );

}
  
export default PokemonCard;