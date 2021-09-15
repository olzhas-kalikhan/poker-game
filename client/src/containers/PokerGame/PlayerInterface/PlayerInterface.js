import { Typography, Button, Slider, Grid, Input } from "@material-ui/core";
import BetSlider from "components/BetSlider/BetSlider";
import SlotTimer from "components/SlotTimer/SlotTimer";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useStyles } from "./PlayerInterface.styles";

const PlayerInterface = ({ user, socket, gameID, gameState, slot }) => {
  const [startTimer, setStartTimer] = useState(false);
  const classes = useStyles();

  const { _highestBet, _slots } = gameState;
  const idx = _slots.find((slot) => slot._player?._id === user._id);
  const [betValue, setBetValue] = useState(slot._player?.points);
  const handleInputChange = (event) => {
    setBetValue(event.target.value === "" ? "" : Number(event.target.value));
  };
  const handleSliderChange = (event, newValue) => {
    setBetValue(newValue);
  };
  const handleBetButton = () => {
    socket.emit("bet", { gameID, idx, userID: user._id, betValue });
  };
  const handleFoldButton = () => {
    socket.emit("fold", { gameID, idx, userID: user._id });
  };
  const handleBlur = () => {
    if (betValue < _highestBet) {
      setBetValue(_highestBet);
    } else if (betValue > slot._player.points) {
      setBetValue(slot._player.points);
    }
  };
  return (
    <div className={classes.root}>
      <BetSlider
        value={betValue}
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
        min={_highestBet - slot._bet || 0}
        max={slot._player.points}
        step={10}
      />

      <Input
        value={betValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        inputProps={{
          step: 50,
          min: _highestBet,
          max: slot._player.points,
          type: "number",
          "aria-labelledby": "input-slider",
        }}
      />

      <Button variant="contained" color="primary" onClick={handleBetButton}>
        Bet
      </Button>

      <Button variant="contained" color="secondary" onClick={handleFoldButton}>
        Fold
      </Button>

      <SlotTimer startTimer={startTimer} onTimerEnd={handleFoldButton} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  socket: state.auth.socket,
});
export default connect(mapStateToProps)(PlayerInterface);
