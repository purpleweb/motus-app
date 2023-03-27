import { Letter } from './Letter';

export function Square({ letter, valid = false, wrongPlace = false, error = false}) {
  let classes = ["column", "cell"];

  if (valid) {
    classes.push("v")
  }
  if (wrongPlace) {
    classes.push("wp");
  }
  if (error) {
    classes.push("error")
  }

  return (
    <div className={classes.join(' ')}><Letter letter={letter} /></div>
  );
}