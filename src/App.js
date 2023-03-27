import { useState } from 'react';
import { Input } from './Input';
import { Line } from './Line';
import { LineInput } from './LineInput';
import { Timer } from './Timer';
import { ShowSolution } from './ShowSolution';
import { computeHints, generateSolution } from './utils';
import './App.scss';
import { createPortal } from 'react-dom';

export const STATUS = {
  START: 'START',
  PLAYING: 'PLAYING',
  WIN: 'WIN',
  GAMEOVER: 'GAMEOVER'
}

function App() {
  const [state, setState] = useState(STATUS.START);
  const [wordList, setWordList] = useState([]);
  const [solution, setSolution] = useState(null);
  const [timer, setTimer] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  function handleAddWord(wordToAdd) {
    wordToAdd = wordToAdd.toUpperCase();
    setWordList([...wordList, wordToAdd]);
    if (wordToAdd === solution) {
      setState(STATUS.WIN);
    }
  }

  function handleStart() {
    setWordList([]);
    setSolution(generateSolution());
    setState(STATUS.PLAYING);
    setTimer(0);
  }

  function handleShowSolution() {
    setShowSolution(true);
  }

  function lettersFound() {
    let lettersFound = Array(8).fill(null);
    lettersFound[0] = solution[0];

    wordList.forEach(function (word) {
      const [validHints,] = computeHints(word, solution);
      validHints.forEach(function (valid, index) {
        if (valid) {
          lettersFound[index] = solution[index];
        }
      });
    })

    return lettersFound;
  }

  if (state === STATUS.START) {
    return (
      <div className="App">
        <div className="container">
          <h1 className="title"> MOTUS </h1>
          <div className="box"> Bienvenue sur ce jeu inspiré du célèbre jeu Motus diffusé à la télévision.  </div>
          <button className="button is-primary" onClick={handleStart} data-testid="start">Commencer à jouer</button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container">
        <h1 className="title"> MOTUS </h1>
        <div className="board" data-testid="board">
          {wordList.map((word, index) => {
            return (<Line key={index} word={word} wordToGuess={solution} />);
          })}
          {state === STATUS.PLAYING &&
            <>
              <LineInput letters={lettersFound()} />
              <Input onWordAdd={handleAddWord} />
            </>
          }
          {state === STATUS.WIN &&
            <div className="notification is-success">
              Bravo, c'est gagné !
            </div>
          }
        </div>
        <div className="level">
          <div className="level-left">
            <div className='level-item'>
              <button className="button is-warning is-light" onClick={handleStart} data-testid="restart">recommencer</button>
            </div>
            <div className='level-item'>
              <button className="button is-info is-light" onClick={handleShowSolution} disabled={state !== STATUS.PLAYING ? "disabled" : ""} data-testid="show-solution">solution</button>
            </div>
          </div>
          <Timer timer={timer} setTimer={setTimer} state={state} />
        </div>
      </div>
      {createPortal(
        <ShowSolution solution={solution} showSolution={showSolution} setShowSolution={setShowSolution} />,
        document.body
      )}
    </div>
  );
}

export default App;
