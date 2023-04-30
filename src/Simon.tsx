import { useEffect, useRef, useState } from "react";
import Sim from "./Sim";

function Simon() {
  const [side, setSide] = useState<number[]>([]);
  const [Recordside, setRecordside] = useState<number[]>([]);
  const [count, setCount] = useState<number>(0)
  const [guess, setGuess] = useState<number>(0)
  const [play, setPlay] = useState<boolean>(false)
  const [timerIds, setTimerIds] = useState<number[]>([])
    // refs
    const buttonRef = useRef<HTMLButtonElement>(null);
    const greenRef = useRef<HTMLButtonElement | null>(null);
    const redRef = useRef<HTMLButtonElement | null>(null);
    const yellowRef = useRef<HTMLButtonElement | null>(null);
    const blueRef = useRef<HTMLButtonElement | null>(null);
    
  useEffect(() => {
    console.log("Recordside:", Recordside);
    console.log("side:", side);
    console.log("count:", count);
  }, [count, Recordside, side]);
  
  const clickPlay = () => {
    setPlay(true)
  }
  let Timeouts: number[]
  let reminder = () => {
    let delay = 200;
    Timeouts = []
    const green = greenRef.current;
    const red = redRef.current;
    const yellow = yellowRef.current;
    const blue = blueRef.current;


    for (let i = 0; i <= count; i++) {
      Timeouts.push(setTimeout(() => {
        let currentGuess = Math.floor(Math.random() * 4);
        if (currentGuess === 0) {
          green?.classList.add("brightness-150");
        } else if (currentGuess === 1) {
          red?.classList.add("brightness-150");
        } else if (currentGuess === 2) {
          yellow?.classList.add("brightness-150");
        } else if (currentGuess === 3) {
          blue?.classList.add("brightness-150");
        }
        setSide(preSide => [...preSide, currentGuess]);
       setTimeout(() => {
          if (currentGuess === 0) {
            green?.classList.remove("brightness-150");
          } else if (currentGuess === 1) {
            red?.classList.remove("brightness-150");
          } else if (currentGuess === 2) {
            yellow?.classList.remove("brightness-150");
          } else if (currentGuess === 3) {
            blue?.classList.remove("brightness-150");
          }
          console.log("currentGuess", currentGuess);
        }, 400);
      }, delay));
      delay += 600;
    }
    const buttons = [green, red, yellow, blue];
    buttons.forEach((button, index: number) => {
      button ? button.onclick = () => {
        if (index < 4) {
          setRecordside(prevRecordside => [...prevRecordside, index]);
        }
      } : null;
    });
    
    if(side.length === Recordside.length && Recordside.join(" ") === side.join(" ")) {
      setCount(prevCount => prevCount + 1);
    } if(side.length === Recordside.length && Recordside.join(" ") !== side.join(" ")) {
      console.log(Timeouts, "Timeouts")
      Timeouts.forEach(clearTimeout)
      setCount(count => count = 0);
      setRecordside(prevRecordside => prevRecordside = []);
      setSide(prevside => prevside = []);
      console.log("no")
    }  
  };
  return (
    <div className="relative flex flex-col justify-center items-center">
      <div>
        <Sim ref={greenRef} color= "bg-green-500" angle= "rounded-tl-full" />
        <Sim ref={redRef} color= "bg-red-500" angle= "rounded-tr-full" />
      </div>
      <div>
        <Sim ref={yellowRef} color= "bg-yellow-400" angle= "rounded-bl-full" />
        <Sim ref={blueRef} color= "bg-blue-500" angle= "rounded-br-full" />
      </div>
      <button className="absolute border-none bg-neutral-900 text-white hover:outline-none focus:outline-none text-xl sm:text-2xl font-bold rounded-full w-[150px] sm:w-[175px] h-[150px] sm:h-[175px] transition duration-200 hover:scale-105" onClick={() => reminder()}>Play</button>
    </div>
  );
}

export default Simon;
