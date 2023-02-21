import { Square } from "./Square";

export function LineInput({letters}) {
    return (
      <div className="columns is-mobile">
        <Square letter={letters[0]} />
        <Square letter={letters[1]} />
        <Square letter={letters[2]} />
        <Square letter={letters[3]} />
        <Square letter={letters[4]} />
        <Square letter={letters[5]} />
        <Square letter={letters[6]} />
        <Square letter={letters[7]} />
      </div>
    );
}
