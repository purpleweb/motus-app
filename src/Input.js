import { useState } from "react";

export function Input({ onWordAdd }) {
    const [input, setInput] = useState('');
    const invalid = input.length !== 8;

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

    let button = <button data-testid="valider" className="button is-primary">Valider</button>;
    if (invalid) {
        button = <button data-testid="valider" disabled className="button is-primary">Valider</button>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="control">
                <div className="field has-addons">
                    <p className="control">
                        <input data-testid="input" className="input is-focused" maxLength="8" onChange={onInputChange} type="text" name="bid" value={input} />
                    </p>
                    <p className="control">
                        {button}
                    </p>
                </div>
            </div>
        </form>
    )
}