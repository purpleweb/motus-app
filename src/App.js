import { useState } from 'react';

import { Input } from './Input';
import { Line } from './Line';
import { LineInput } from './LineInput';
import { computeHints } from './utils';

import './App.scss';

//const wordListInit = ["ARMATURE", "ATIRANCE", "ARITECEN", "ACCIDENT", "ATTIRANC", "ARRICOTS", "ABRICOTS"];
const wordListInit = [];

function App() {
  const [state, setState] = useState('PLAYING'); // START, PLAYING, WIN, GAMEOVER

  const [wordList, setWordList] = useState(wordListInit);
  const solution = "ABRICOTS";
  console.info("Motus init ! word to guess = " + solution);

  function handleAddWord(wordToAdd) {
    setWordList([...wordList, wordToAdd.toUpperCase()]);
  }

  function handleRestart() {
    setWordList([]);
  }

  function lettersFound() {
    let lettersFound = Array(8).fill(null);
    lettersFound[0] = solution[0];

    wordList.forEach(function(word) {
      const [validHints, wrongPlacedHints] = computeHints(word, solution);
      validHints.forEach(function(valid, index) {
        if (valid) {
          lettersFound[index] = solution[index];
        }
      });
    })

    return lettersFound;
  }

  return (
    <div className="App">
      <div className="container">
        <h1 className="title"> MOTUS </h1>
        <div className="board">
          {wordList.map((word, index) => {
            return (<Line key={index} word={word} wordToGuess={solution} />);
          })}
          <LineInput letters={lettersFound()} />
          <Input onWordAdd={handleAddWord} />
          <button onClick={handleRestart}>restart</button>
        </div>
      </div>
    </div>
  );
}


export default App;
