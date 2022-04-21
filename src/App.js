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
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
    }
  }, [dice])


  const handleDiceRoll = () => {
    if (!tenzies) {
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
    setTenzies(!tenzies)
  }

  let isWon;

  const diceElements = dice.map(die => (
    <Die key={die.id}
      isHeld={die.isHeld}
      value={die.value}
      id={die.id}
      holdDice={holdDice}
    />
  ))

  return (

    <main>
      <div className='title'>
        <h1>Tenzies</h1>
        <p> Objective: get all ten of your dice to show the same number</p>
      </div>

      <div className="dice-container">

        {diceElements}
      </div>

      {!tenzies ? <button
        onClick={handleDiceRoll}
        className={tenzies ? 'no-roll-dice' :
          'roll-dice'}>Roll</button> :
        <button
          className='reset-button'
          onClick={resetHandler}>Play Again?</button>
      }

      {tenzies && <div className="you-win">
        <h1>You Win!</h1>
      </div>}

    </main>


  )
}

export default App;
