import { Grid } from "@material-ui/core";
import PokerCard from "../PokerCard/PokerCard";
import { useStyles } from "./TableCards.styles";

const STAGE_CARDS = {
  0: 0,
  1: 3,
  2: 4,
  3: 5,
};
const TableCards = (props) => {
  const classes = useStyles();
  const { tableCards, totalPot, gameStage } = props;
  return (
    <Grid
      className={classes.root}
      container
      spacing={5}
      justifyContent="center"
    >
      {tableCards?.slice(0, STAGE_CARDS[gameStage]).map((card, i) => (
        <Grid item key={`${i}-tableCard`}>
          <PokerCard suit={card.suit} rank={card.rank} />
        </Grid>
      ))}
      <Grid item>{totalPot}</Grid>
    </Grid>
  );
};
export default TableCards;
