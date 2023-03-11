import { computeHints } from "./utils";
import { Square } from "./Square";

export function Line({ word, wordToGuess }) {
  const [hints, wrongPlacedHints, errors] = computeHints(word, wordToGuess);
  const letters = word.split('');
  return (
    <div className="columns is-mobile" data-testid="filled-line">
      {letters.map((letter, i) => {
        return (<Square key={i} letter={letter} valid={hints[i]} wrongPlace={wrongPlacedHints[i]} error={errors[i]} />);
      })}
    </div>
  )
}