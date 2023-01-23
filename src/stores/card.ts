import { defineStore } from "pinia";
import type { Card } from "@/interfaces/Card";
import type { Location } from '@/interfaces/Location';

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
        return (id: number) => state.cards.find((card: Card) => card.name === id.toString());
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
