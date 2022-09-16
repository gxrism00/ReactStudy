import { useState, useEffect } from "react";

const TimerTest = (props) => {
    const [timer, setTimer] = useState(5);

    useEffect(() => {
        const t = setInterval(() => {
            console.log("setInterval");

            if (timer <= 0) clearTimeout(t);
            else setTimer(() => timer - 1);
        }, 1000);
        return () => clearTimeout(t);
    }, [timer]);

    return timer;
};

export default TimerTest;
