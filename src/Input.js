import { useState } from "react";

export function Input({ onWordAdd }) {
    const [input, setInput] = useState('');
    const invalid = input.length !== 8;

    function onInputChange(e) {
        setInput(e.target.value.trim());
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (input.length === 8) {
            setInput('');
            onWordAdd(input);
        }
    }

    const disabled = invalid ? "disabled" : ""

    return (
        <form onSubmit={handleSubmit}>
            <div className="control">
                <div className="field has-addons">
                    <p className="control">
                        <input data-testid="input" className="input is-focused" maxLength="8" onChange={onInputChange} type="text" name="bid" value={input} />
                    </p>
                    <p className="control">
                        <button data-testid="valider" disabled={disabled} className="button is-primary">Valider</button>
                    </p>
                </div>
            </div>
        </form>
    )
}