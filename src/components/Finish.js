function Finish({finish, setComponent, opponent, selectedPokemon}) {


    return (
        <div className="finish flex-column a-center j-center h-100">
            {
                finish===1 ? (
                    <p><b>I WON</b> and got a new Pokemon, <b>{opponent.name}</b>. :)</p>
                ) :
                finish===-1 ? (
                    <p><b>I was DEFEATED</b> and lost <b>{selectedPokemon.name}</b>. :(</p>
                ) : (
                    <p>...</p>
                )
            }
            <button className="mt-5" onClick={()=>setComponent('Locations')}>Let's go on a new adventure!</button>
        </div>
    );

}
  
export default Finish;