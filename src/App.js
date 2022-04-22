import React, { useState, useEffect } from 'react';
import { nanoid } from "nanoid"
import './App.css';
import Die from './components/Die';
import Popup from './components/Popup';
import Leaderboard from './components/Leaderboard';

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
  const [attempts, setAttempts] = useState(0)
  const [seen, setSeen] = useState(false)
  const [leaderboard, setLeaderboard] = useState(
    JSON.parse(localStorage.getItem("leaderboard")) || [
      { name: 'eesa', score: 10 },
      { name: 'maryum', score: 8 },
      { name: 'zara', score: 7 }
    ]
  )


  useEffect(() => {
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard))
  }, [leaderboard])

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])


  const handleDiceRoll = () => {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    }
    setAttempts(prevState => prevState + 1)
  }


  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  const resetHandler = () => {
    setDice(allNewDice)
    setTenzies(!tenzies)
    setAttempts(0)
  }


  const diceElements = dice.map(die => (
    <Die key={die.id}
      isHeld={die.isHeld}
      value={die.value}
      id={die.id}
      holdDice={holdDice}
    />
  ))

  const handleExit = () => {
    resetHandler()
  }

  const addToLeaderboard = (score) => {
    const input = prompt("enter name")
    let userScore = score
    setLeaderboard([...leaderboard, { name: input, score: userScore }])

  }

  return (

    <main>
      <div className='title'>
        <h1>Tenzies</h1>
        <p> Objective: get all ten of your dice to show the same number. Click the roll button to start and click the die whose value you want to hold.</p>
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
      <div>
        <h2>Attempts: {attempts}</h2>
      </div>



      {tenzies &&
        <Popup
          addToLeaderboard={addToLeaderboard}
          leaderboard={leaderboard}
          attempts={attempts}
          handleExit={handleExit}
        />
      }

    </main>


  )
}

export default App;
