import { Letter } from './Letter';

export function Square({ letter, valid = false, wrongPlace = false, error = false, cursor = false }) {

  function handleKeyPress(e) {
    ///console.log(e);
  }

  let classes = "column cell";

  if (valid) {
    classes += " v";
  }
  if (wrongPlace) {
    classes += " wp";
  }
  if (error) {
    classes += " error";
  }
  if (cursor) {
    classes += " cursor";
  }

  if (cursor) {
    <div className={classes}><Letter letter={letter} onKeyPress={handleKeyPress} /></div>
  }

  return (
    <div className={classes}><Letter letter={letter} /></div>
  );
}