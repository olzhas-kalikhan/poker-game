import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import { useStyles } from "./PokerGame.styles";
import TableCards from "./TableCards/TableCards";
import PlayerSlotList from "./PlayerSlotList/PlayerSlotList";
import GamesServices from "_services/games.services";
import PlayerInterface from "./PlayerInterface/PlayerInterface";
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

const PokerGame = (props) => {
  const { socket, gameList, user } = props;
  const { gameID } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [gameState, setGameState] = useState({ cardDeck: [], slots: [] });
  const [currentSlot, setCurrentSlot] = useState();
  const startGame = () => {
    socket.emit("start-game", gameID);
  };
  const updateGameState = (state) => {
    setGameState(state);
    let slot = state._slots.find((slot) => slot._player?._id === user._id);
    setCurrentSlot(slot);
  };
  useEffect(() => {
    if (!gameList[gameID]) history.push("/");
    else {
      GamesServices.fetchGame(gameID)
        .then((game) => {
          setGameState(game._state);
          let slot = game._state._slots.find(
            (slot) => slot._player?._id === user._id
          );
          setCurrentSlot(slot);
          console.log(slot);
        })
        .catch(console.log);
      socket.emit("join-room", { gameID });
    }
    socket.on("game-state-update", updateGameState);
    return () => {
      socket.emit("leave-room", { gameID });
      socket.off("game-state-update", updateGameState);
    };
  }, [gameList, gameID, socket]);

  return (
    <div className={classes.root}>
      <div>
        <Button variant="contained" color="primary" onClick={startGame}>
          Start Game
        </Button>
        <Button onClick={() => history.push("/games")}>Next</Button>
        <Button>Reset</Button>
      </div>
      <div className={classes.pokerTable}>
        <TableCards
          className={classes.tableCards}
          tableCards={gameState._tableCards}
          totalPot={gameState._totalPot}
          gameStage={gameState._gameStage}
        />
        <PlayerSlotList gameID={gameID} gameState={gameState} />
        {currentSlot && (
          <PlayerInterface
            gameID={gameID}
            gameState={gameState}
            slot={currentSlot}
          />
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  socket: state.auth.socket,
  user: state.auth.user,
  gameList: state.games.gameList,
});
export default connect(mapStateToProps)(PokerGame);
