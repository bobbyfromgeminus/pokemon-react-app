import './App.css';
import React, { useState } from "react";
import Locations from './components/Locations';
import Location from './components/Location';
import MyPokemons from './components/MyPokemons';
import PokemonSelector from './components/PokemonSelector';
import BattleField  from './components/BattleField';
import Finish  from './components/Finish';
import Inventory  from './components/Inventory';

function App() {

  // ENTITÁS TÁROLÓ STATE-K ------------------------------------------------------------------------

    // kiválasztott Location alap adatai - részletesebb lekérdezés a Location-ben megvalósítva
    const [location, setLocation] = useState({});
    // kiválasztott Ellenfél adatait tároló state
    const [opponent, setOpponent] = useState({ empty: true });

  
  // SAJÁT POKÉMONJAIM -----------------------------------------------------------------------------

    // Saját pokémonjaim state-je. Csak a neveket tárolja
    const [myPokemonsName, setMyPokemonsName] = useState(['bulbasaur', 'charizard', 'poliwhirl']);

    // Saját pokémonjaim adatait tároló state - egyelőre üres
    const [myPokemons, setMyPokemons] = useState([]);

    // Csatára kiválasztott Pokémonon
    const [selectedPokemon, setSelectedPokemon] = useState({});

    // Játék végeredménye
    const [finish, setFinish] = useState(0);


  // KOMPONENSEK KEZELÉSE --------------------------------------------------------------------------

    // Komponensek közötti navigáció state-je
    const [component, setComponent] = useState('Locations');

    let componentContainer = '';

    // Locations
    if (component === 'Locations') {
      componentContainer =  <Locations        setComponent={setComponent} 
                                              setLocation={setLocation} 
                            />;
    }
    // Location
    else if (component === 'Location') {
      componentContainer =  <Location         setComponent={setComponent} 
                                              location={location}
                                              setOpponent={setOpponent}
                                              opponent={opponent}
                            />;
    }
    // MyPokemons
    else if (component === 'MyPokemons') {
      componentContainer =  <MyPokemons       setComponent={setComponent} 
                                              myPokemonsName={myPokemonsName}
                                              setMyPokemons={setMyPokemons}
                            />;
    }
    // PokemonSelector
    else if (component === 'PokemonSelector') {
      componentContainer =  <PokemonSelector  setComponent={setComponent}
                                              opponent={opponent}
                                              myPokemons={myPokemons}
                                              setSelectedPokemon={setSelectedPokemon}
                            />;
    }
    // BattleField
    else if (component === 'BattleField') {
      componentContainer =  <BattleField      setComponent={setComponent}
                                              selectedPokemon={selectedPokemon}
                                              opponent={opponent}
                                              myPokemonsName={myPokemonsName}
                                              setMyPokemonsName={setMyPokemonsName}
                                              setFinish={setFinish}
                            />;
    }
    // Finish
    else if (component === 'Finish') {
      componentContainer =  <Finish           setComponent={setComponent}
                                              finish={finish}
                            />;
    }


  // RETURN ----------------------------------------------------------------------------------------

  return (
    <div className="App">
        <div>
          {componentContainer}
        </div>
        <br/>
        <br/>
        <Inventory items={myPokemonsName.length}/>
    </div>
  );

}

export default App;
