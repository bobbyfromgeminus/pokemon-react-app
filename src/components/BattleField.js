import React, { useState } from "react";
import PokemonBattleCard  from './PokemonBattleCard';

function BattleField({ setComponent, opponent, selectedPokemon, myPokemonsName, setMyPokemonsName, setFinish }) {

    //  ((((2/5+2)*B*60/D)/50)+2)*Z/255
    // B is the attacker's Attack, D is defender's Defense, and Z is a random number between 217 and 255.
    // The HP, Attack,and Defense can be read from the API at pokemon.stats
    // pokemon.stats[0].stat.name
    
    const [endOfGame, setEndOfGame] = useState(false);

    const [roundCounter, setRoundCounter] = useState(0);

    const [opponentStats, setOpponentStats] = useState({
        name: opponent.name,
        img: opponent.sprites.other.showdown.front_default,
        maxhp: opponent.stats[0].base_stat,
        hp: opponent.stats[0].base_stat,
        attack: opponent.stats[1].base_stat,
        defense: opponent.stats[2].base_stat,
    });

    const [myheroStats, setMyheroStats] = useState({
        name: selectedPokemon.name,
        img: selectedPokemon.sprites.other.showdown.front_default,
        maxhp: selectedPokemon.stats[0].base_stat,
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

        // saját pokemonom sebzése
        if (roundCounter%2 === 0) {
            const reducedPokemon = myheroStats;
            reducedPokemon.hp = Math.round((myheroStats.hp - hpReducer) * 100) / 100;
            setMyheroStats(reducedPokemon);
            document.getElementById('card-opponent').classList.remove('hit');
            document.getElementById('card-myhero').classList.add('hit');
            if (myheroStats.hp <= 0) {
                // itt én veszítettem
                setEndOfGame(true);
                updateMyPokemons(-1);
            }

        // opponent pokemon sebzése
        } else {
            const reducedPokemon = opponentStats;
            reducedPokemon.hp = Math.round((opponentStats.hp - hpReducer) * 100) / 100
            setOpponentStats(reducedPokemon);
            document.getElementById('card-opponent').classList.add('hit');
            document.getElementById('card-myhero').classList.remove('hit');
            if (opponentStats.hp <= 0) {
                // itt én nyertem
                setEndOfGame(true);
                updateMyPokemons(1);
            }
        }
        setRoundCounter(roundCounter+1);
    }

    return (
        <div className="battlefield flex-column">
            <h2><span className="opponent-color">{opponentStats.name}</span> vs <span className="hero-color">{myheroStats.name}</span></h2>
            <h5>enemy vs ally</h5>
            <br/>
            <div className="flex">
                <PokemonBattleCard pokemon={opponentStats} id={'card-opponent'}/>
                <PokemonBattleCard pokemon={myheroStats} id={'card-myhero'}/>
            </div>
            <button onClick={() => battleRound()}>FIGHT!!!</button>
            <br/>
            <br/>
            {
                endOfGame ? (
                    <p>GAME OVER</p>
                ) : (
                    <p>The battle is going on, we are in the round #{roundCounter}</p>
                )
            }
        </div>
    );
}
  
export default BattleField;