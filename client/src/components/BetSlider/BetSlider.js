import { Slider, withStyles } from "@material-ui/core";
const HEIGHT = 40;
const BORDER_RADIUS = 20;
const BetSlider = withStyles({
  root: {
    height: HEIGHT,
    width: "50%",
    marginRight: 30,
  },
  thumb: {
    height: 50,
    width: 50,
    marginLeft: -25,
    backgroundColor: "#fff",
    border: "solid 2px rgba(60, 64, 67, 0.3)",
    boxShadow:
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;",
  },
  track: {
    height: HEIGHT,
    borderRadius: BORDER_RADIUS,
  },
  rail: {
    height: HEIGHT,
    borderRadius: BORDER_RADIUS,
  },
})(Slider);
export default BetSlider;
