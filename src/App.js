import React, { useState, useEffect } from 'react';
import { nanoid } from "nanoid"
import './App.css';
import Die from './components/Die';

function App() {

  const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  const [dice, setDice] = useState(allNewDice())


  const handleDiceRoll = () => {
    if (!isWon) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    }

  }


  function holdDice(id) {
    if (!isWon) {
      setDice(oldDice => oldDice.map(die => {
        return die.id === id ?
          { ...die, isHeld: !die.isHeld } :
          die
      }))

    }

  }

  const resetHandler = () => {
    setDice(allNewDice)
  }

  let isWon;

  const diceElements = dice.map(die => (
    <Die key={die.id}
      isHeld={die.isHeld}
      value={die.value}
      id={die.id}
      holdDice={holdDice}
      isWon={isWon}

    />
  ))



  const playGame = () => {
    if (dice.every(x => x.isHeld == true)) {
      console.log("check")
      isWon = true
    }
  }


  playGame()

  return (

    <main>
      <div className='title'>
        <h1>Tenzies</h1>
        <p> Objective: get all ten of your dice to show the same number</p>
      </div>

      <div className="dice-container">

        {diceElements}
      </div>

      <button
        onClick={handleDiceRoll}
        className={isWon ? 'no-roll-dice' : 'roll-dice'}>Roll</button>

      {isWon && <div className="you-win">
        <h1>You Win!</h1>
        <button
          className='reset-button'
          onClick={resetHandler}>Play Again?</button>
      </div>}

    </main>


  )
}

export default App;
