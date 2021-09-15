import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import PlayerSlot from "../PlayerSlot/PlayerSlot";

const PlayerSlotList = (props) => {
  const { gameID, gameState, socket, user } = props;
  const [currentSlotIdx, setCurrentSlotIdx] = us;
  const takeSlot = (slotIdx) => () => {
    socket.emit("join-game", { gameID, user, slotIdx });
  };
  return (
    <>
      <Grid
        container
        spacing={10}
        justifyContent="space-around"
        alignItems="stretch"
      >
        {gameState._slots?.map((slot, i) => (
          <Grid key={`${i}-slot`} item>
            <PlayerSlot slot={slot} idx={i} takeSlot={takeSlot(i)} />
          </Grid>
        ))}
      </Grid>
      <PlayerInterface
        gameID={gameID}
        gameState={gameState}
        slot={currentSlot}
      />
    </>
  );
};
const mapStateToProps = (state) => ({
  socket: state.auth.socket,
  user: state.auth.user,
});
export default connect(mapStateToProps)(PlayerSlotList);
