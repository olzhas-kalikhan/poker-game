import { useHistory, useRouteMatch } from "react-router-dom";
import { Button, ButtonGroup, Grid } from "@material-ui/core";
import {  Switch } from "react-router-dom";
import LoginForm from "components/forms/LoginForm";
import NewAccountForm from "components/forms/NewAccountForm";
import PublicRoute from "components/hoc/PublicRoute/PublicRoute";
import { useStyles } from "./LandingPage.styles";


const LandingPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const handleLoginButton = () => {
    history.push(`${url}/login`);
  };

  const handleNewAccountButton = () => {
    history.push(`${url}/newaccount`);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={6}>
          <div style={{ display: "grid", placeItems: "center" }}>
            <ButtonGroup orientation="vertical" size="large">
              <Button onClick={handleNewAccountButton}>New Account</Button>
              <Button onClick={handleLoginButton}>Login</Button>
              <Button>Practice</Button>
              <Button>Rules</Button>
            </ButtonGroup>
          </div>
        </Grid>
        <Grid item xs={6}>
          <Switch>
            <PublicRoute path={`${path}/`} exact>
              <h1>Poker</h1>
            </PublicRoute>
            <PublicRoute path={`${path}/login`} component={LoginForm} />
            <PublicRoute
              path={`${path}/newaccount`}
              component={NewAccountForm}
            />
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
};
export default LandingPage;
