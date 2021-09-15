import React from "react";
import "./App.css";
import LandingPage from "./containers/LandingPage/LandingPage";
import { Container, CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PublicRoute from "components/hoc/PublicRoute/PublicRoute";
import PokerGame from "containers/PokerGame/PokerGame";
import PrivateRoute from "components/hoc/PublicRoute/PrivateRoute";
import GameList from "containers/GameList/GameList";

const App = () => {
  return (
    <Router>
      <Container style={{ backgroundColor: "transparent" }}>
        <CssBaseline />

        <Switch>
          <PublicRoute path="/welcome" component={LandingPage} />
          <PrivateRoute path="/game/:gameID" component={PokerGame} />
          <PrivateRoute exact path="/" component={GameList} />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
