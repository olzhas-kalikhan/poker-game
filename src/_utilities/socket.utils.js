const PokerGame = require("../classes/PokerGame.class");

const gameList = {};

const findUserSlot = (slots, userID) => {
  return slots.find((slot) => slot.player?._id === userID);
};

exports.initSocket = (socket) => {
  socket.userID = socket.handshake.query?.userID;
  socket.to(socket.id).emit("game-list", gameList);
};

exports.onNewGame =
  (io) =>
  ({ gameID, slots }) => {
    gameList[gameID] = new PokerGame(gameID, slots);
    io.emit("new-game", { gameID, gameData: gameList[gameID] });
  };
exports.onJoinRoom =
  (socket) =>
  ({ gameID }) => {
    if (gameList[gameID]) {
      socket.join(gameID);
      console.log(socket.userID, "Joined Room", gameID);
    } else {
      console.log("Room not found");
    }
  };

exports.onJoinGame =
  (io) =>
  ({ gameID, user, slotIdx }) => {
    gameList[gameID].getState().getSlotByUserId(user._id)?.reset();
    gameList[gameID].getState().getSlot(slotIdx).setPlayer(user);
    io.in(gameID).emit("game-state-update", gameList[gameID].getState());
  };
exports.onLeaveRoom =
  (io, socket) =>
  ({ gameID }) => {
    gameList[gameID].getState().getSlotByUserId(socket.userID)?.reset();

    io.in(gameID).emit("game-state-update", gameList[gameID].getState());
    socket.leave(gameID);
    console.log(socket.userID, "left", gameID);
  };
exports.onBet =
  (io, socket) =>
  ({ gameID, idx, userID, betValue }) => {
    if (userID === socket.userID) {
      gameList[gameID].newBet(idx, betValue);
      gameList[gameID].getState().setNextCurrentTurnIdx();
      gameList[gameID].getState().nextGameStage();

      io.in(gameID).emit("game-state-update", gameList[gameID].getState());
    }
  };
exports.onFold =
  (io, socket) =>
  ({ gameID, idx, userID }) => {
    gameList[gameID].getState().getSlot(idx).fold();
    io.in(gameID).emit("game-state-update", gameList[gameID].getState());
  };

exports.onStartGame = (io) => (gameID) => {
  gameList[gameID].startGame();
  io.in(gameID).emit("game-state-update", gameList[gameID].getState());
};
exports.gameList = gameList;
