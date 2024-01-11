function PokemonBattleCard({pokemon}) {

    return (
        <div className="pokemon-battlecard">
            <h2>{pokemon.name}</h2>
            <div className="img" style={{ backgroundImage: `url("${pokemon.img}")` }}/>
            <p>HP: {pokemon.hp}/{pokemon.maxhp}</p>
            <p>Attack: {pokemon.attack}</p>
            <p>Defense: {pokemon.defense}</p>
        </div>
    );

}
  
export default PokemonBattleCard;