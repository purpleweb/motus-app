import { useState } from "react";

export function Input({onWordAdd}) {
  const [input, setInput] = useState('');
  const disabled = input.length < 8;

  function onInputChange(e) {
    setInput(e.target.value);
  }

  function handleAddWord() {
    setInput('');
    onWordAdd(input);
  }

  return (
    <div>
      <input maxLength="8" onChange={onInputChange} type="text" name="bid" value={input} />
      <button onClick={handleAddWord} disabled={disabled}>ok</button>
    </div>
  )
}