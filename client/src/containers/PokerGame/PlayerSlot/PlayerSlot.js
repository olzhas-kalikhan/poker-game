import { Typography, Button, Slider, Grid, Input } from "@material-ui/core";

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import PokerCard from "../PokerCard/PokerCard";
import { useStyles } from "./PlayerSlot.styles";
const PlayerSlot = (props) => {
  const { slot, idx, takeSlot } = props;
  const [startTimer, setStartTimer] = useState(false);

  const classes = useStyles({ idx });
  const handleTakeSlotButton = () => {
    takeSlot();
  };

  return (
    <div className={classes.root}>
      <Typography variant="body">{slot._bet}</Typography>
      <div className={classes.playerHand}>
        {!slot._isActive ? (
          <Button variant="contained" onClick={handleTakeSlotButton}>
            Take Slot
          </Button>
        ) : (
          <div>
            <div className={classes.playerCards}>
              {slot._cards.map((card, j) => (
                <PokerCard
                  key={`Player-${idx} Card-${j}`}
                  rank={card.rank}
                  suit={card.suit}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
  socket: state.auth.socket,
});
export default connect(mapStateToProps)(PlayerSlot);
