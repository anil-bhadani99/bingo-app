import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import shuffle from "shuffle-array";

import "./styles.css";

import { run } from "./animation";

function Animation() {
  useEffect(() => {
    run();
  });
  return <canvas id="canvas" />;
}

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
  "CONF CALL 😷 BINGO",
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

function App() {
  useEffect(() => {
    toggle(12);
  }, []);

  const [state, setState] = useState({ checked: {} });
  const isWon = (checked) => {
    const range = [0, 1, 2, 3, 4];

    return (
      undefined !==
        range.find((row) =>
          range.every((column) => {
            return checked[row * 5 + column];
          })
        ) ||
      undefined !==
        range.find((column) =>
          range.every((row) => {
            return checked[row * 5 + column];
          })
        ) ||
      range.every((index) => {
        return checked[index * 5 + index];
      }) ||
      range.every((index) => {
        return checked[index * 5 + 4 - index];
      })
    );
  };
  const toggle = (id) =>
    setState((state) => {
      const checked = { ...state.checked, [id]: !state.checked[id] };
      const checked1 = { ...state.checked, [id]: !state.checked[id] };
      const won = isWon(checked1);
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
        {Object.keys(bingoWords).map((id) => (
          <Tile key={id} id={id} isSet={!!state.checked[id]} onToggle={() => toggle(id)}>
            {bingoWords[id]}
          </Tile>
        ))}
      </div>
      {state.won ? <Animation /> : null}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
