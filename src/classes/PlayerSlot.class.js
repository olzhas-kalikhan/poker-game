module.exports = class PlayerSlot {
  constructor() {
    this._player = null;
    this._isActive = false;
    this._bet = null;
    this._cards = [];
    this._hand = null;
  }
  setPlayer(player) {
    this._isActive = true;
    this._player = player;
  }
  getPlayer() {
    return this._player;
  }
  setIsActive(active) {
    this._isActive = !!active;
  }
  isActive() {
    return this._isActive;
  }
  setBet(bet) {
    this._bet += bet;
  }
  resetCurrentBet() {
    this._bet = 0;
  }
  getBet() {
    return this._bet;
  }
  addCard(card) {
    this._cards.push(card);
  }
  getCards() {
    return this._cards;
  }
  reset() {
    this._player = null;
    this._isActive = false;
    this._bet = null;
    this._cards = [];
    this._hand = null;
  }
  fold() {
    if (this._isActive) {
      this._bet = null;
      this._cards = [];
      this._hand = null;
    }
  }
  setHand(hand) {
    this._hand = hand;
  }
  getHand() {
    return this._hand;
  }
};
