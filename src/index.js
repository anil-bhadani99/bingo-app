import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import shuffle from "shuffle-array";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import "./styles.css";

function Tile({ id, children, onToggle, isSet }) {
  return (
    <div onClick={onToggle} className={`tile ${isSet ? "tile--set" : ""}`}>
      {children}
    </div>
  );
}

const bingoWords = [
  "(child noises in the background)",
  "Hello, hello?",
  "I need to jump in another call",
  "Can everyone go on mute",
  "Could you please get closer to the mic",
  "(load painful echo / feedback)",
  "Next slide, please.",
  "Can we take this offline?",
  "Is ___ on the call?",
  "Could you share this slides afterwards?",
  "Can somebody grant presenter rights?",
  "Can you email that to everyone?",
  "Sorry i had problems logging in",
  "(animal noises in the background)",
  "Sorry, i didn't found the conference I'd",
  "I was having connection issues",
  "I'll have to get back to you",
  "Who just joined?",
  "Sorry, something ___ with my calendar",
  "Do you see my screen?",
  "Lets wait for ___!",
  "You will send the minutes?",
  "Sorry, i was on mute.",
  "Can you repeat, please?",
];

let bingoWordsShuffle = Object.values(shuffle(bingoWords).reduce((data, value, index) => ({ ...data, [index]: value }), {}));
bingoWordsShuffle.splice(12, 0, "CONF CALL 😷 BINGO");

const range = [0, 1, 2, 3, 4];
let completeRow = [];
let completeCol = [];
let temp;

function App() {
  const { width, height } = useWindowSize();
  useEffect(() => {
    toggle(12);
  }, []);

  const [state, setState] = useState({ checked: {} });
  const [isRun, setIsRun] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsRun(false);
    }, 3000);
  }, [isRun]);

  const isWon = (checked) => {
    if (
      undefined !==
      range.find((row) => {
        temp = row;
        return (
          !completeRow.includes(temp) &&
          range.every((column) => {
            return checked[row * 5 + column];
          })
        );
      })
    ) {
      completeRow.push(temp);
      return true;
    }

    if (
      undefined !==
      range.find((column) => {
        temp = column;
        return (
          !completeCol.includes(temp) &&
          range.every((row) => {
            return checked[row * 5 + column];
          })
        );
      })
    ) {
      completeCol.push(temp);
      return true;
    }

    if (
      range.every((index) => {
        return checked[index * 5 + index];
      })
    ) {
      return true;
    }

    if (
      range.every((index) => {
        return checked[index * 5 + 4 - index];
      })
    ) {
      return true;
    }
    return false;
  };
  const toggle = (id) =>
    setState((state) => {
      const checked = { ...state.checked, [id]: !state.checked[id] };
      const won = isWon(checked);
      console.log("won : ", won);
      setIsRun(won);

      return {
        ...state,
        checked,
        won,
      };
    });

  return (
    <div className="App">
      <h1>Bingo</h1>
      <div className="wrapper">
        {Object.keys(bingoWordsShuffle).map((id) => (
          <Tile key={id} id={id} isSet={!!state.checked[id]} onToggle={() => toggle(id)}>
            {bingoWordsShuffle[id]}
          </Tile>
        ))}
      </div>
      {state.won && isRun && <Confetti width={width} height={height} />}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
