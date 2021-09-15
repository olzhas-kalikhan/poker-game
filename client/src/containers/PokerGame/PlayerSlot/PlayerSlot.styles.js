import { makeStyles } from "@material-ui/core";
const WIDTH = 200;
const HEIGHT = 100;
const calcPosition = (top, left) => {
  return {
    top: `calc(${top} - ${HEIGHT / 2}px)`,
    left: `calc(${left} - ${WIDTH / 2}px)`,
  };
};
const COORDS = [
  calcPosition("30%", "35%"),
  calcPosition("52%", "22%"),
  calcPosition("68%", "50%"),
  calcPosition("52%", "78%"),
  calcPosition("30%", "65%"),
];
export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: ({ idx }) => COORDS[idx].top,
    left: ({ idx }) => COORDS[idx].left,
  },
  playerHand: {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
    borderRadius: "2em",
    backgroundColor: "rgba(255,255,255,0.5)",
    backdropFilter: "blur(3px)",
    padding: "2em 1.5em",
    height: HEIGHT,
    width: WIDTH,
    display: "grid",
    placeItems: "center",
  },
  playerCards: {
    display: "flex",
    justifyContent: "space-around",
  },
}));
