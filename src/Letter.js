export function Letter({ letter }) {
  if (letter === undefined || letter === null) {
    return (<p>&nbsp;</p>);
  }
  if (letter.length === 0) {
    return (<p>&nbsp;</p>);
  }
  return (<p>{letter}</p>);
}