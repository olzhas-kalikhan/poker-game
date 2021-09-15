const ranks = "23456789TJQA";
const suits = "hdcs";
const Hand = require("pokersolver").Hand;
exports.rankValue = (rank) => {
  if (rank === "J") return 11;
  if (rank === "Q") return 12;
  if (rank === "K") return 13;
  if (rank === "A") return 14;
  return rank;
};

exports.getDeck = () => {
  const deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ card: rank + suit, suit, rank });
    }
  }
  return deck;
};
exports.shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
};

exports.nextActivePlayerIndex = (slots, currentActiveIdx) => {
  let index,
    i = currentActiveIdx === slots.length - 1 ? 0 : currentActiveIdx + 1;
  while (i != currentActiveIdx) {
    if (slots[i].isActive) {
      index = i;
      break;
    } else {
      if (i >= slots.length - 1) {
        i = 0;
      }
    }
    i++;
  }
  return index;
};

exports.getWinner = () => {};

exports.getSolvedHand = (cards) => {
  let cardLabels = cards.map(({ card }) => card);
  let hand = Hand.solve(cardLabels);
  return hand;
};
