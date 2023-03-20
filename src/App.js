import { useState, useEffect } from 'react';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const dieElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDie={() => holdDie(die.id)}
    />
  ));

  useEffect(checkTenzies, [dice]);

  function randomNumber() {
    return Math.ceil(Math.random() * 6);
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 1; i <= 10; i++) {
      newDice.push({
        id: nanoid(),
        value: randomNumber(),
        isHeld: false,
      });
    }
    return newDice;
  }

  function holdDie(dieId) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === dieId ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          if (die.isHeld) return die;
          return { ...die, value: randomNumber() };
        })
      );
    } else {
      setDice(allNewDice());
      setTenzies(false);
    }
  }

  function checkTenzies() {
    const isAllHeld = dice.every((die) => die.isHeld);
    const isAllSame = new Set(dice.map((die) => die.value)).size === 1;
    if (isAllHeld && isAllSame) setTenzies(true);
  }

  return (
    <main className="main-content">
      {tenzies && <Confetti />}
      <div className="game">
        <h2 className="title">Tenzies</h2>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{dieElements}</div>
        <button className="roll" onClick={rollDice}>
          {tenzies ? 'Reset Game' : 'Roll'}
        </button>
      </div>
    </main>
  );
}

export default App;
