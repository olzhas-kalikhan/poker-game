import Hearts from "assets/cardDeck/Hearts.svg";
import Diamonds from "assets/cardDeck/Diamonds.svg";
import Clubs from "assets/cardDeck/Clubs.svg";
import Spades from "assets/cardDeck/Spades.svg";

const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const suits = [
  { label: "H", icon: Hearts },
  { label: "D", icon: Diamonds },
  { label: "C", icon: Clubs },
  { label: "S", icon: Spades },
];
export const getDeck = () => {
  const deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ card: suit.label + rank, suit: suit.icon, rank });
    }
  }
  return deck;
};
