import { useState } from "react";

export function Input({ onWordAdd }) {
    const [input, setInput] = useState('');
    const disabled = input.length < 8;

    function onInputChange(e) {
        setInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (input.length === 8) {
            setInput('');
            onWordAdd(input);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input maxLength="8" onChange={onInputChange} type="text" name="bid" value={input} />
            </form>
        </div>
    )
}