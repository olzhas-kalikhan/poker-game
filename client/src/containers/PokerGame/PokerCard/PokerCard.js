import { Typography } from "@material-ui/core";
import { useStyles } from "./PokerCards.styles";

import Hearts from "assets/cardDeck/Hearts.svg";
import Diamonds from "assets/cardDeck/Diamonds.svg";
import Clubs from "assets/cardDeck/Clubs.svg";
import Spades from "assets/cardDeck/Spades.svg";
const icons = {
  h: Hearts,
  d: Diamonds,
  c: Clubs,
  s: Spades,
};

const PokerCard = (props) => {
  const { rank, suit } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.cardRank} variant="h3">
        {rank}
      </Typography>
      <img
        className={classes.cardSuit}
        src={icons[suit]}
        alt={`Card ${rank} of ${suit}`}
      />
    </div>
  );
};
export default PokerCard;
