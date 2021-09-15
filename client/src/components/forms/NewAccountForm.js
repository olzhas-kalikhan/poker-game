import { Formik, Field, Form } from "formik";
import { TextField, Button } from "@material-ui/core";
import { useStyles } from "./Forms.styles";
import authServices from "_services/auth.services";
const NewAccountForm = () => {
  const classes = useStyles();
  const handleSubmit = (values) => {
    authServices
      .register(values)
      .then(() => alert("acc created"))
      .catch((err) => console.err(err));
  };
  return (
    <div className={classes.root}>
      <h1>New Account</h1>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
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
            />
            <Field
              className={classes.field}
              name="email"
              as={TextField}
              label="Email"
              type="email"
            />
            <Field
              className={classes.field}
              name="password"
              as={TextField}
              label="Password"
              type="password"
            />
            <Field
              className={classes.field}
              name="confirmPassword"
              as={TextField}
              label="Confirm Password"
              type="password"
            />
            <Button
              className={classes.submitButton}
              variant="contained"
              color="primary"
              type="submit"
              size="large"
            >
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default NewAccountForm;
