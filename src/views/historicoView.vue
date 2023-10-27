<template>
  <div class="bg-gradient-to-b from-green-900 to-blue-600 min-h-screen flex justify-center items-center">
    <div class="text-center p-4 w-80 rounded-lg shadow-lg bg-gradient-to-b from-green-900 to-green-500">
      <h1 class="text-3xl font-bold mb-4 text-white">Histórico de Cálculos</h1>
      <ul class="text-left">
        <li v-for="(calculation, index) in reversedHistory" :key="index" class="mb-4 p-2 bg-blue-200 rounded-lg">
          <span class="text-green-500 font-semibold">{{ calculation.expression }}</span>
          <span class="text-blue-500 font-semibold ml-4">=</span>
          <span class="text-yellow-500 font-semibold ml-4">{{ calculation.result }}</span>
        </li>
      </ul>
      <router-link to="/" class="block mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600">Voltar para a Calculadora</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCalculatorStore } from "@/store/historico.js";

const calculatorStore = useCalculatorStore();
const history = computed(() => calculatorStore.history);
const reversedHistory = computed(() => history.value.slice().reverse());
</script>
