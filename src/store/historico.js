// store/calculator.js
import { defineStore } from 'pinia';

export const useCalculatorStore = defineStore({
  id: 'calculator',
  state: () => ({
    history: [],
  }),
  actions: {
    addCalculation(calculation) {
      this.history.push(calculation);
    },
    clearHistory() {
      this.history = [];
    },
  },
});
