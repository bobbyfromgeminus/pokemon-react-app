import React, { useState } from "react";

function BattleField({ setComponent, opponent, selectedPokemon, myPokemonsName, setMyPokemonsName, setFinish }) {

    //  ((((2/5+2)*B*60/D)/50)+2)*Z/255
    // B is the attacker's Attack, D is defender's Defense, and Z is a random number between 217 and 255.
    // The HP, Attack,and Defense can be read from the API at pokemon.stats
    // pokemon.stats[0].stat.name
    
    const [endOfGame, setEndOfGame] = useState(false);

    const [roundCounter, setRoundCounter] = useState(0);

    const [opponentStats, setOpponentStats] = useState({
        hp: opponent.stats[0].base_stat,
        attack: opponent.stats[1].base_stat,
        defense: opponent.stats[2].base_stat,
    });

    const [myheroStats, setMyheroStats] = useState({
        hp: selectedPokemon.stats[0].base_stat,
        attack: selectedPokemon.stats[1].base_stat,
        defense: selectedPokemon.stats[2].base_stat,
    });

    const updateMyPokemons = (direction) => {
        // nyertem, ezért enyém lesz az ellenfél pokémon is
        if (direction === 1) {
            const newArray = myPokemonsName;
            newArray.push(opponent.name);
            setMyPokemonsName(newArray);
            setFinish(1);
        }
        // vesztettem, ezért elveszítem a kiválasztott pokémonomat
        else if (direction === -1) {
            const index = myPokemonsName.indexOf(selectedPokemon.name);
            if (index > -1) {
                const newArray = myPokemonsName;
                newArray.splice(index, 1);
                setMyPokemonsName(newArray);
                setFinish(-1);
            }
        }
        setComponent('Finish');
    }

    // Hogy ne csak a száraz adatoktól függjön a csata kimenetele, egy kis szerencse-fűszer
    const luckyPowder = () => {
        const min = 217;
        const max = 255;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const battleRound = () => {
        let B;
        let D;
        if (roundCounter%2 === 0) {
            B = opponentStats;
            D = myheroStats;
        } else {
            B = myheroStats;
            D = opponentStats;
        }
        const Z = luckyPowder();
        // Kapott képlet alapján kiszámoljuk a sebzés mértékét.
        const hpReducer = ((((2/5+2)*B.attack*60/D.defense)/50)+2)*Z/255;
        if (roundCounter%2 === 0) {
            const reducedPokemon = myheroStats;
            reducedPokemon.hp = myheroStats.hp - hpReducer;
            setMyheroStats(reducedPokemon);
            if (myheroStats.hp <= 0) {
                // itt én veszítettem
                setEndOfGame(true);
                updateMyPokemons(-1);
            }
        } else {
            const reducedPokemon = opponentStats;
            reducedPokemon.hp = opponentStats.hp - hpReducer;
            setOpponentStats(reducedPokemon);
            if (opponentStats.hp <= 0) {
                // itt én nyertem
                setEndOfGame(true);
                updateMyPokemons(1);
            }
        }
        setRoundCounter(roundCounter+1);
    }

    return (
        <div className="battlefield">
            <h1>BattleField</h1>
            <div>
                <h2>ellenfél: {opponent.name}</h2>
                <h3>{roundCounter}</h3>
                <img alt="opponent" className="pixelated" src={opponent.sprites.other.showdown.front_default}/>
                <ul>
                    <li>hp: {opponentStats.hp}</li>
                    <li>attack: {opponentStats.attack}</li>
                    <li>defense: {opponentStats.defense}</li>
                </ul>
            </div>
            <div>
                <h2>harcosom: {selectedPokemon.name}</h2>
                <img alt="mypokemon" className="pixelated" src={selectedPokemon.sprites.other.showdown.front_default}/>
                <ul>
                    <li>hp: {myheroStats.hp}</li>
                    <li>attack: {myheroStats.attack}</li>
                    <li>defense: {myheroStats.defense}</li>
                </ul>
            </div>
            <button onClick={() => battleRound()}>HARC!!!</button>
            <br/>
            <br/>
            {
                endOfGame ? (
                    <p>vége a játéknak</p>
                ) : (
                    <p>zajlik a csata</p>
                )
            }
        </div>
    );
}
  
export default BattleField;