import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    userSelect: "none",
    border: "solid 1px",
    borderRadius: "10px",
    justifyContent: "center",
    alignItems: "center",
    height: "90%",
  },
  cardSuit: {
    width: "50%",
  },
  cardRank: {
    margin: theme.spacing(0, 1),
    fontSize: "3rem",
  },
}));
