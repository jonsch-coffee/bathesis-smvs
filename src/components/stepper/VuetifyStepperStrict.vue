<template>
  <!-- Strict Stepper: Schritt-für-Schritt mit Antwortpflicht -->
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step :complete="step > 1" step="1">Frage 1</v-stepper-step>
      <v-stepper-step :complete="step > 2" step="2">Antwort 1</v-stepper-step>
      <v-stepper-step :complete="step > 3" step="3">Frage 2</v-stepper-step>
      <v-stepper-step :complete="step > 4" step="4">Antwort 2</v-stepper-step>
      <v-stepper-step step="5">Abschluss</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content v-if="step === 1" step="1">
        <p>Ist der Code auf der Verpackung lesbar?</p>
        <v-btn @click="selectAnswer('step1', 'yes')">Ja</v-btn>
        <v-btn @click="selectAnswer('step1', 'no')">Nein</v-btn>
      </v-stepper-content>

      <v-stepper-content v-if="step === 2" step="2">
        <p>Du hast Frage 1 mit <strong>{{ answers.step1 }}</strong> beantwortet.</p>
        <v-btn class="mt-2" @click="step++" :disabled="!answers.step1">Weiter</v-btn>
        <v-btn class="mt-2" @click="step--">Zurück</v-btn>
      </v-stepper-content>

      <v-stepper-content v-if="step === 3" step="3">
        <p>Ist das Medikament gültig registriert?</p>
        <v-btn @click="selectAnswer('step2', 'yes')">Ja</v-btn>
        <v-btn @click="selectAnswer('step2', 'no')">Nein</v-btn>
        <v-btn class="mt-2" @click="step--">Zurück</v-btn>
      </v-stepper-content>

      <v-stepper-content v-if="step === 4" step="4">
        <p>Du hast Frage 2 mit <strong>{{ answers.step2 }}</strong> beantwortet.</p>
        <v-btn class="mt-2" @click="step++" :disabled="!answers.step2">Weiter</v-btn>
        <v-btn class="mt-2" @click="step--">Zurück</v-btn>
      </v-stepper-content>

      <v-stepper-content v-if="step === 5" step="5">
        <p>Die Befragung ist abgeschlossen.</p>
        <ul>
          <li>Frage 1: {{ answers.step1 }}</li>
          <li>Frage 2: {{ answers.step2 }}</li>
        </ul>
        <v-btn class="mt-2" @click="reset">Neu starten</v-btn>
        <v-btn class="mt-2" @click="step--">Zurück</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script setup>
import { ref } from 'vue'

const step = ref(1)

const answers = ref({
  step1: null,
  step2: null
})

function selectAnswer(question, value) {
  answers.value[question] = value
  step.value++
}

function reset() {
  answers.value = {
    step1: null,
    step2: null
  }
  step.value = 1
}
</script>

<style scoped>
p {
  margin-bottom: 1rem;
}
.text-red {
  color: red;
  font-weight: bold;
}
</style>
