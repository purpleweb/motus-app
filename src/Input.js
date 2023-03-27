import { useState } from "react";

export function Input({ onWordAdd }) {
    const [input, setInput] = useState('');

    const WORD_LENGTH = 8;
    const invalid = input.length !== WORD_LENGTH;

    function onInputChange(e) {
        setInput(e.target.value.trim());
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (input.length === WORD_LENGTH) {
            setInput('');
            onWordAdd(input);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="control">
                <div className="field has-addons">
                    <p className="control">
                        <input data-testid="input" className="input is-focused" maxLength={WORD_LENGTH.toString()} onChange={onInputChange} type="text" name="bid" value={input} />
                    </p>
                    <p className="control">
                        <button data-testid="valider" disabled={invalid ? "disabled" : ""} className="button is-primary">Valider</button>
                    </p>
                </div>
            </div>
        </form>
    )
}