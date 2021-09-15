const {
  initSocket,
  onNewGame,
  onJoinRoom,
  onJoinGame,
  onLeaveRoom,
  onStartGame,
  onBet,
  onFold,
} = require("../_utilities/socket.utils");

exports.socketSetup = (io) => {
  io.on("connection", (socket) => {
    initSocket(socket);

    socket.on("create-game", onNewGame(io));
    socket.on("join-room", onJoinRoom(socket));
    socket.on("join-game", onJoinGame(io));

    socket.on("leave-room", onLeaveRoom(io, socket));
    socket.on("start-game", onStartGame(io));
    socket.on("bet", onBet(io, socket));
    socket.on("fold", onFold(io, socket));
  });
};
