import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    position: "fixed",
    bottom: 0,
    width: "50%",
    left: "25%",
    padding: theme.spacing(10, 0),
  },
  slider: {
    width: "50%",
  },
}));
