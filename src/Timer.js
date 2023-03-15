import { useEffect } from "react";
import { STATUS } from "./App";

export function Timer({timer, setTimer, state}) {

    function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        let secondsString = seconds.toString();
        if (seconds < 10) {
            secondsString = '0' + secondsString;
        }
        return `${minutes}:${secondsString}`;
    }

    const timerDisplay = formatTime(timer);

    useEffect(() => {
        function onTick() {
            if (state === STATUS.PLAYING) {
                setTimer(t => t + 1);
            }
        }
        const intervalId = setInterval(onTick, 1000);
        return () => clearInterval(intervalId);
    }, [state, setTimer])

    return <div className="level-right">
        <span className="timer" data-testid="timer">{timerDisplay}</span>
    </div>
}