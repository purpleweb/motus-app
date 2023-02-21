import { useState } from 'react';

import { Input } from './Input';
import { Line } from './Line';
import { LineInput } from './LineInput';
import { computeHints } from './utils';

import dict from './dict.json';

import './App.scss';

const STATE_START = 'START';
const STATE_PLAYING = 'PLAYING';
const STATE_WIN = 'WIN';
const STATE_GAMEOVER = 'GAMEOVER';

function App() {
  const [state, setState] = useState(STATE_START);
  const [wordList, setWordList] = useState([]);
  const [solution, setSolution] = useState('');

  function generateSolution() {
    const random = dict[Math.floor(Math.random()*dict.length)];
    console.log("Solution générée : "+random);
    setSolution(random);
  }

  function handleAddWord(wordToAdd) {
    wordToAdd = wordToAdd.toUpperCase();
    setWordList([...wordList, wordToAdd]);
    if (wordToAdd === solution) {
      setState(STATE_WIN);
    }
  }

  function handleStart() {
    setWordList([]);
    generateSolution();
    setState(STATE_PLAYING);
  }

  function lettersFound() {
    let lettersFound = Array(8).fill(null);
    lettersFound[0] = solution[0];

    wordList.forEach(function(word) {
      const [validHints,] = computeHints(word, solution);
      validHints.forEach(function(valid, index) {
        if (valid) {
          lettersFound[index] = solution[index];
        }
      });
    })

    return lettersFound;
  }

  if (state === STATE_START) {
    return (
      <div className="App">
        <div className="container">
          <h1 className="title"> MOTUS </h1>
          <p>Bienvenue sur ce jeu inspiré du célèbre jeu Motus diffusé à la télévision.</p>
          <button className="button is-primary" onClick={handleStart}>Commencer à jouer</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container">
        <h1 className="title"> MOTUS </h1>
        <div className="board">
          {wordList.map((word, index) => {
            return (<Line key={index} word={word} wordToGuess={solution} />);
          })}
          {state == STATE_PLAYING &&
            <>
              <LineInput letters={lettersFound()} />
              <Input onWordAdd={handleAddWord} />
            </>
          }
          {state == STATE_WIN &&
            <div className="notification is-success">
              Bravo, c'est gagné !
            </div>
          }
        </div>
        <hr />
        <div className="box">
          <p>Vous pouvez à tout moment recommencer une nouvelle partie en cliquant sur le bouton restart.</p>
          <button className="button is-warning" onClick={handleStart}>restart</button>
        </div>
      </div>
    </div>
  );
}

export default App;
