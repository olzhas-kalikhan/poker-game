import { makeStyles } from "@material-ui/core";
import tableImg from "assets/pokerTable/poker-table.png";
export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
    justifyContent: "center",
  },
  tableCards: {
    marginBottom: theme.spacing(5),
  },

  pokerTable: {
    backgroundImage: `url(${tableImg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    position: "relative",
    height: "100%",
  },
  tableCards: {
    position: "absolute",
  },
  playerHand: {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
    borderRadius: "2em",
    padding: "2em 1.5em",
  },
  card: {
    display: "flex",
  },
  cardRank: {
    margin: theme.spacing(0, 1),
    fontSize: "4rem",
  },
  cardSuit: {
    width: "50%",
  },
}));
