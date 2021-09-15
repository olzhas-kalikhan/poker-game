import {
  Button,
  Container,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import shortid from "shortid";
import { addGame } from "_actions/games.actions";
import { useStyles } from "./GameList.styles";
const GameList = (props) => {
  const { socket, gameList } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleNewGameButtonClick = () => {
    const gameID = shortid.generate();
    socket.emit("create-game", { gameID, slots: 5 });
  };
  const handleJoinButtonClick = (gameID) => () => {
    history.push(`/game/${gameID}`);
  };

  useEffect(() => {
    const onNewGame = (game) => {
      dispatch(addGame(game));
    };
    socket.on("new-game", onNewGame);
    return () => {
      socket.off("new-game", onNewGame);
    };
  }, []);
  return (
    <Container>
      <Button onClick={handleNewGameButtonClick}>New Game</Button>
      <List>
        {Object.entries(gameList).map(([gameID, data]) => (
          <ListItem key={gameID}>
            <div className={classes.listItem}>
              <Typography variant="h5">{gameID}</Typography>
              <Typography variant="h5"> {data._slotsSize}</Typography>
              <Button onClick={handleJoinButtonClick(gameID)}> JOIN</Button>
            </div>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  socket: state.auth.socket,
  gameList: state.games.gameList,
});
export default connect(mapStateToProps)(GameList);
