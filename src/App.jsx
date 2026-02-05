import { useEffect, useRef, useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const domElement = useRef(null);
  
  let gameWon =
  dice.every((diceObj) => diceObj.isHeld) &&
  dice.every((diceObj) => diceObj.value === dice[0].value);
  
  useEffect(() => {
    if(gameWon) domElement.current.focus();
  }, [gameWon])

  function generateAllNewDice() {
    console.log("called!!");
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    gameWon
      ? setDice(generateAllNewDice())
      : setDice((prev) =>
          prev.map((diceObj) =>
            diceObj.isHeld
              ? diceObj
              : { ...diceObj, value: Math.ceil(Math.random() * 6) }
          )
        );
  }


  function hold(id) {
    setDice((prev) =>
      prev.map((diceObj) =>
        diceObj.id === id ? { ...diceObj, isHeld: !diceObj.isHeld } : diceObj
      )
    );
  }

  const diceElements = dice.map((num) => (
    <Die key={num.id} diceObj={num} onClick={hold} />
  ));
  // console.log("Run");
  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button ref={domElement} className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
