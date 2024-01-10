function Finish({finish, setComponent}) {


    return (
        <div className="mypokemons">
            {
                finish===1 ? (
                    <p>NYERTEM! Szereztem egy új Pokemont. :)</p>
                ) :
                finish===-1 ? (
                    <p>VESZTETTEM! Oda lett egy Pokemonon. :(</p>
                ) : (
                    <p>...</p>
                )
            }
            <button onClick={()=>setComponent('Locations')}>Vissza a játék elejére.</button>
        </div>
    );

}
  
export default Finish;