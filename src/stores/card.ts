import { defineStore } from "pinia";
import type { Card } from "@/interfaces/Card";
import type { Location } from '@/interfaces/Location';
import AllCards from "@/cards.json";

interface State {
  cards: Card[]
  filteredCards: Card[]
  locations: Location[]
}

export const useCardStore = defineStore("card", {
  state: (): State =>{
    return {
      cards: [],
      filteredCards: [],
      locations: []
    }
  },
  getters: {
    getCard: (state) => {
        return (name: string) => state.cards.find((card: Card) => card.name === name);
    }
  },
  actions: {
    setFilteredCards(payload: Card[]) {
      this.filteredCards = payload;
    },
    setCards(payload: Card[]) {
      this.cards = payload;
    },
  },
});

const store = useCardStore();
store.setCards(AllCards);
