import { CircularProgress } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";

const SlotTimer = (props) => {
  const { onTimerEnd, startTimer } = props;
  const [timerValue, setTimerValue] = useState(60);
  const timer = useRef();
  const triggerTimer = () => {
    timer.current = setInterval(() => {
      setTimerValue((prevValue) => {
        if (prevValue - 0.05 <= 0) {
          clearInterval(timer.current);
          onTimerEnd();
        }
        return prevValue - 0.05;
      });
    }, 50);
  };

  useEffect(() => {
    if (startTimer) triggerTimer();
    else {
      clearInterval(timer.current);
      setTimerValue(60);
    }
    return () => clearInterval(timer.current);
  }, [startTimer]);
  return (
    <div>
      <CircularProgress variant="determinate" value={(timerValue / 60) * 100} />
      {Math.round(timerValue)}
    </div>
  );
};
export default SlotTimer;
