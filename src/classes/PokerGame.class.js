const {
  getDeck,
  shuffle,
  nextActivePlayerIndex,
} = require("../_utilities/poker.utils");
const GameState = require("./GameState.class");

module.exports = class PokerGame {
  constructor(gameID, slots) {
    this._gameID = gameID;
    this._state = new GameState(slots);
  }
  getGameID() {
    return this._gameID;
  }
  getState() {
    return this._state;
  }

  startGame() {
    if (this._state.getActiveSlotsLength() >= 2) {
      this._state.reset();
      this._state.setBlinds();
      this._state.dealCards();
      this._state.setIsGameInProgress(true);
      this._state.setCurrentTurnIdx();
      this._state.setHands();
      this._state.getWinner();
    } else {
      console.log("Need more players to start");
    }
  }
  newBet(slotIdx, betValue) {
    this._state.getSlot(slotIdx).setBet(betValue);
    this._state.setHighestBet(betValue);
  }
  reset() {
    this._state.reset();
  }
};
