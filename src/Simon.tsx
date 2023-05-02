import { useEffect, useRef, useState } from "react";
import Sim from "./Sim";

function Simon() {
  const [side, setSide] = useState<number[]>([]);
  const [Recordside, setRecordside] = useState<number[]>([]);
  const [count, setCount] = useState<number>(0)
  const [play, setPlay] = useState<boolean>(false)
  const [Timeouts, setTimeouts] = useState<number[]>([]);
    // refs
    const greenRef = useRef<HTMLButtonElement | null>(null);
    const redRef = useRef<HTMLButtonElement | null>(null);
    const yellowRef = useRef<HTMLButtonElement | null>(null);
    const blueRef = useRef<HTMLButtonElement | null>(null);
    // currents refs 
    const green = greenRef.current;
    const red = redRef.current;
    const yellow = yellowRef.current;
    const blue = blueRef.current;
    const buttons = [green, red, yellow, blue];
  useEffect(() => {
    setPlay(true)
    console.log("Recordside:", Recordside);
    console.log("side:", side);
  }, [count, Recordside, side]);
  const clickPlay = () => {
    if(play) {
      setPlay(true)
      reminder()
    }
  }
  const resetGame = () => {
    console.log(Timeouts, "Timeouts")
    Timeouts.forEach(clearTimeout)
    setCount(count => count = 0);
    setRecordside(prevRecordside => prevRecordside = []);
    setSide(prevside => prevside = []);
  }
  const Addcolor = () => {
    let delay = 200;
    setTimeouts([]);
    for (let i = 0; i <= count; i++) {
      Timeouts.push(setTimeout(() => {
        let currentGuess = Math.floor(Math.random() * 4);
        setSide(preSide => [...preSide, currentGuess]);
        buttons[currentGuess]?.classList.add("brightness-150")
        console.log(i, "i")
        setTimeout(() => {
          buttons[currentGuess]?.classList.remove("brightness-150")
          console.log("currentGuess", currentGuess);
        }, 400);
      }, delay));
      delay += 600;
    }
  }
  const reminder = () => {
    if(play) {
        if(Recordside.join(" ") === side.join(" ")) {
          setCount(prevCount => prevCount + 1);
          Addcolor()
        } if(side.length === Recordside.length && Recordside.join(" ") !== side.join(" ")) {
          resetGame()
        } 
        buttons.forEach((button, index: number) => {
          button ? button.onclick = () => {
            if (index < 4) {
              button.classList.add("opacity-50")
              setRecordside(prevRecordside => [...prevRecordside, index]);
            }
              setTimeout(() => {
                button.classList.remove("opacity-50")
              }, 180);
          } : null;
        });
    }
  };
  return (
    <div className="relative flex flex-col justify-center items-center">
      <div>
        <Sim ref={greenRef} onClick={() => reminder()}  color= "bg-green-500" angle= "rounded-tl-full" />
        <Sim ref={redRef} onClick={() => reminder()} color= "bg-red-500" angle= "rounded-tr-full" />
      </div>
      <div>
        <Sim ref={yellowRef} onClick={() => reminder()} color= "bg-yellow-400" angle= "rounded-bl-full" />
        <Sim ref={blueRef} onClick={() => reminder()} color= "bg-blue-500" angle= "rounded-br-full" />
      </div>
      <button className="absolute border-none bg-neutral-900 text-white hover:outline-none focus:outline-none text-xl sm:text-2xl font-bold rounded-full w-[150px] sm:w-[175px] h-[150px] sm:h-[175px] transition duration-200 hover:scale-105" onClick={() => clickPlay()}>
      {side.length === 0 ? "Play" : count}
      </button>
    </div>
  );
}

export default Simon;
