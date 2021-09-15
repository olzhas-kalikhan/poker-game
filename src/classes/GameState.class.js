const {
  getDeck,
  shuffle,
  rankValue,
  getSolvedHand,
} = require("../_utilities/poker.utils");
const PlayerSlot = require("./PlayerSlot.class");
const Hand = require("pokersolver").Hand;
module.exports = class GameState {
  constructor(numOfSlots) {
    this._isGameInProgress = false;
    this._tableCards = [];
    this._totalPot = 0;
    this._highestBet = 0;
    this._bettingRound = 0;
    this._gameStage = 0;
    this._currentTurnIdx = -1;
    this._bigBlindIdx = null;
    this._smallBlindIdx = null;
    this._slots = Array.from({ length: numOfSlots }, () => new PlayerSlot());
  }

  reset() {
    this._isGameInProgress = false;
    this._gameStage = 0;
    this._totalPot = 0;
    this._highestBet = 0;
    this._bettingRound = 0;
    this.resetSlots();
  }
  resetSlots() {
    this.getSlots().forEach((slot) => slot.fold());
  }
  isGameInProgress() {
    return this._isGameInProgress;
  }
  setIsGameInProgress(bool) {
    this._isGameInProgress = bool;
  }
  setTableCards(cards) {
    this._tableCards = cards;
  }
  getTableCards() {
    return this._tableCards;
  }
  getSlots() {
    return this._slots;
  }
  getSlotsSize() {
    return this._slots.length;
  }
  getSlot(i) {
    return this._slots[i];
  }
  getSlotByUserId(userID) {
    return this.getSlots().find((slot) => slot._player?._id === userID);
  }
  getTotalPot() {
    return this._totalPot;
  }
  setTotalPot() {
    this.getSlots().forEach((slot) => {
      if (slot.isActive) this._totalPot += slot.bet;
    });
  }
  getHighestBet() {
    return this._highestBet;
  }
  setHighestBet(bet) {
    if (bet > this._highestBet) this._highestBet = bet;
  }
  resetHighestBet() {
    this._highestBet = 0;
  }
  getBettingRound() {
    return this._bettingRound;
  }
  nextBettingRound() {
    this._bettingRound += 1;
  }
  nextActiveSlotIdx(currIdx) {
    let nextIdx = -1;
    for (let i = currIdx + 1; i != currIdx; i++) {
      if (i >= this.getSlotsSize()) {
        i = 0;
      }
      if (this.getSlot(i).isActive()) {
        nextIdx = i;
        break;
      }
    }
    return nextIdx;
  }
  getGameStage() {
    return this._gameStage;
  }
  resetBets() {
    this.getSlots().forEach((slot) => {
      if (slot.isActive()) slot.resetCurrentBet();
    });
  }
  nextGameStage() {
    if (this.isAllBetsSame()) {
      this.setTotalPot();
      this.resetBets();
      this.resetHighestBet();
      this._gameStage += 1;
    }
  }
  resetGameStage() {
    this._gameStage = null;
  }
  getActiveSlotsIds() {
    let activeSlotIds = [];
    this.getSlots().forEach((slot, i) => {
      if (slot.isActive()) {
        activeSlotIds.push(i);
      }
    });
    return activeSlotIds;
  }
  getActiveSlotsLength() {
    return this.getActiveSlotsIds().length;
  }
  setBlinds() {
    let activeSlotIds = this.getActiveSlotsIds();
    let isBlinds = this._smallBlindIdx !== null && this._bigBlindIdx !== null;
    if (!isBlinds) {
      this._smallBlindIdx = activeSlotIds[activeSlotIds.length - 2];
      this._bigBlindIdx = activeSlotIds[activeSlotIds.length - 1];
    } else {
      this._smallBlindIdx = this.nextActiveSlotIdx(this._smallBlindIdx);
      this._bigBlindIdx = this.nextActiveSlotIdx(this._bigBlindIdx);
    }
  }
  getCurrentTurnIdx() {
    return this._currentTurnIdx;
  }
  setCurrentTurnIdx() {
    this._currentTurnIdx = this.nextActiveSlotIdx(this._bigBlindIdx);
  }
  setNextCurrentTurnIdx() {
    this._currentTurnIdx = this.nextActiveSlotIdx(this._currentTurnIdx);
  }
  dealCards() {
    const cardDeck = getDeck();
    shuffle(cardDeck);
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < this.getSlotsSize(); j++) {
        if (this.getSlot(j).isActive()) this.getSlot(j).addCard(cardDeck.pop());
      }
    }
    this.setTableCards(cardDeck.splice(cardDeck.length - 6, 5));
  }
  isFirstRound() {
    return this._bettingRound === 0;
  }
  isAllBetsSame() {
    let isSame = true;
    for (let slot of this.getSlots()) {
      if (slot.isActive() && slot.getBet() !== this._highestBet) isSame = false;
    }
    return isSame;
  }
  setHands() {
    this.getSlots().forEach((slot, i) => {
      if (slot.isActive())
        slot.setHand(
          getSolvedHand([
            ...this.getTableCards(),
            ...this.getSlot(i).getCards(),
          ])
        );
    });
  }
  getAllHands() {
    let hands = [];
    this.getSlots().forEach((slot, i) => {
      if (slot.isActive()) hands.push(slot.getHand());
    });
    return hands;
  }
  getWinner() {
    let winner = Hand.winners(this.getAllHands());
    let winnerIds = [];
    console.log(winner);
    this.getSlots().forEach((slot, i) => {
      if (slot.isActive())
        if (slot.getHand().descr === winner[0].descr) {
          winnerIds.push(i);
        }
    });
  }
};
