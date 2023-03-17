export function ShowSolution({solution, showSolution, setShowSolution}) {
    function handleClose() {
        setShowSolution(false);
    }

    if (!showSolution) {
        return '';
    }

    return <div id="modal-js-example" className="modal is-active">
        <div className="modal-background" onClick={handleClose}></div>

        <div className="modal-content">
            <div className="box">
                <p>{solution}</p>
            </div>
        </div>

        <button className="modal-close is-large" aria-label="close" onClick={handleClose}></button>
    </div>
}