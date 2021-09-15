import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "0 auto",
    textAlign: "center",
    padding: theme.spacing(2, 10),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  field: {
    margin: theme.spacing(0.5, 0),
  },
  submitButton: {
    width: "50%",
    margin: theme.spacing(0.5, "auto"),
  },
}));
