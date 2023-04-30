import  { forwardRef } from "react";

type Props = {
  color: string;
  angle: string;
};

const Sim = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  return (
    <button
      ref={ref}
      className={`${props.angle} ${props.color} w-[175px] hover:outline-none focus:outline-none sm:w-[200px] h-[175px] sm:h-[200px] m-2 transition duration-200 hover:scale-105`}
    ></button>
  );
});

export default Sim;
