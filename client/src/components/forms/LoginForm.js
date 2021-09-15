import { Formik, Field, Form } from "formik";
import { TextField, Button, Collapse, IconButton } from "@material-ui/core";
import { useStyles } from "./Forms.styles";

import { useState } from "react";

import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import { useDispatch } from "react-redux";
import { login } from "_actions/auth.actions";
import { useHistory } from "react-router";
import { loadGameList } from "_actions/games.actions";

const LoginForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const clearError = () => setError(null);
  const history = useHistory();
  const handleSubmit = (values) => {
    dispatch(login(values))
      .then(() => {
        dispatch(loadGameList());
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.root}>
      <h1>Login</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className={classes.form}>
            <Field
              className={classes.field}
              name="username"
              as={TextField}
              label="Username"
              error={error !== null}
            />
            <Field
              className={classes.field}
              name="password"
              as={TextField}
              label="Password"
              type="password"
              error={error !== null}
            />

            <Collapse in={error !== null}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={clearError}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {error}
              </Alert>
            </Collapse>
            <Button
              className={classes.submitButton}
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              LOGIN
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default LoginForm;
