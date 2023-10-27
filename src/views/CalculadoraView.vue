<template>
  <div
    class="bg-gradient-to-b from-green-900 to-blue-600 min-h-screen flex justify-center items-center"
  >
    <div class="calculator text-white rounded-lg shadow-lg p-4 mx-auto w-72">
      <div
        :class="[
          'calculator-screen text-right mb-4 rounded-lg p-2 bg-gradient-to-b from-green-900 to-green-500 font-semibold',
          displayValue && displayValue.length > maxDisplayLength
            ? 'text-base'
            : '',
        ]"
      >
        {{ displayValue ? displayValue : currentOperation }}
      </div>
      <div class="calculator-buttons grid grid-cols-4 gap-2">
        <button
          class="calculator-button bg-gray-800 text-white"
          @click="appendToDisplay('7')"
        >
          7
        </button>
        <button
          class="calculator-button bg-gray-800 text-white"
          @click="appendToDisplay('8')"
        >
          8
        </button>
        <button
          class="calculator-button bg-gray-800 text-white"
          @click="appendToDisplay('9')"
        >
          9
        </button>
        <button
          class="calculator-button bg-orange-500 text-white"
          @click="appendToDisplay('+')"
        >
          +
        </button>
        <button
          class="calculator-button bg-gray-800 text-white"
          @click="appendToDisplay('4')"
        >
          4
        </button>
        <button
          class="calculator-button bg-gray-800 text-white"
          @click="appendToDisplay('5')"
        >
          5
        </button>
        <button
          class="calculator-button bg-gray-800 text-white"
          @click="appendToDisplay('6')"
        >
          6
        </button>
        <button
          class="calculator-button bg-orange-500 text-white"
          @click="appendToDisplay('-')"
        >
          -
        </button>
        <button
          class="calculator-button bg-gray-800 text-white"
          @click="appendToDisplay('1')"
        >
          1
        </button>
        <button
          class="calculator-button bg-gray-800 text-white"
          @click="appendToDisplay('2')"
        >
          2
        </button>
        <button
          class="calculator-button bg-gray-800 text-white"
          @click="appendToDisplay('3')"
        >
          3
        </button>
        <button
          class="calculator-button bg-orange-500 text-white"
          @click="appendToDisplay('*')"
        >
          *
        </button>
        <button
          class="calculator-button bg-gray-800 text-white"
          @click="appendToDisplay('0')"
        >
          0
        </button>
        <button
          class="calculator-button bg-orange-500 text-white"
          @click="appendToDisplay('.')"
        >
          .
        </button>
        <button
          class="calculator-button bg-green-500 text-white col-span-2"
          @click="calculateResult"
        >
          =
        </button>
        <button
          class="calculator-button bg-orange-500 text-white"
          @click="appendToDisplay('/')"
        >
          /
        </button>
        <button
          class="calculator-button bg-orange-500 text-white"
          @click="appendToDisplay('%')"
        >
          %
        </button>
        <button
          class="calculator-button bg-orange-500 text-white"
          @click="appendToDisplay('^')"
        >
          ^
        </button>
        <button
          class="calculator-button bg-orange-500 text-white"
          @click="appendToDisplay('sqrt(')"
        >
          √
        </button>
        <button
          class="calculator-button bg-orange-500 text-white"
          @click="appendToDisplay('log(')"
        >
          log
        </button>
        <button
          class="calculator-button bg-orange-500 text-white"
          @click="appendToDisplay('sin(')"
        >
          sin
        </button>
        <button
          class="calculator-button bg-orange-500 text-white"
          @click="appendToDisplay('cos(')"
        >
          cos
        </button>
        <button
          class="calculator-button bg-orange-500 text-white"
          @click="appendToDisplay('tan(')"
        >
          tan
        </button>
        <button
          class="calculator-button bg-green-500 text-white"
          @click="clearDisplay"
        >
          C
        </button>
      </div>
      <router-link to="/historico">
        <button
          class="historico-button bg-green-500 text-white mt-4 px-6 py-2 rounded-lg hover:bg-green-600"
        >
          Histórico
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCalculatorStore } from "@/store/historico.js";
import { evaluate } from "mathjs";

const displayValue = ref("");
const currentOperation = ref("");
const calculatorStore = useCalculatorStore();
const maxDisplayLength = 14;
let isResult = false; // Novo estado para controlar se o valor é um resultado

const appendToDisplay = (value) => {
  if (currentOperation.value) {
    currentOperation.value = "";
  }
  
  if (isResult) {
    // Se o valor for um resultado, limpe a tela
    displayValue.value = "";
    isResult = false; // Defina isResult como falso
  }

  displayValue.value += value;
};

const calculateResult = () => {
  try {
    const expression = displayValue.value;
    const result = evaluate(expression);
    displayValue.value = result.toString();
    currentOperation.value = `${expression} = ${result}`;
    calculatorStore.addCalculation({
      expression: expression,
      result: result,
      timestamp: new Date().toLocaleString(),
    });
    isResult = true; // Defina isResult como verdadeiro após o cálculo
  } catch (error) {
    displayValue.value = "Erro";
    currentOperation.value = "";
  }
};

const clearDisplay = () => {
  displayValue.value = "";
  currentOperation.value = "";
};

window.addEventListener("keydown", () => {
  if (isResult) {
    displayValue.value = "";
    isResult = false; // Defina isResult como falso ao pressionar uma tecla
  }
});
</script>

