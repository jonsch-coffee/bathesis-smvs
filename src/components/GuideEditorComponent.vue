<script setup>
import { ref, reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const guide = reactive({
  id: 1,
  title: 'Neuer Guide',
  opCodes: ['51220300', '51220800'],
  steps: []
})

const opCodesText = ref(guide.opCodes.join(', '))


function updateOpCodes() {
  guide.opCodes = opCodesText.value
      .split(',')
      .map(code => code.trim())
      .filter(code => code)
}

function addStep() {
  const newId = uuidv4()
  guide.steps.push({
    step: newId,
    questionTitle: '',
    description: '',
    question: '',
    options: []
  })
}

function addOption(step) {
  step.options.push({
    id: uuidv4(),
    label: '',
    target: ''
  })
}



</script>

<template>
  <div class="guide-editor">
    <h2>📝 Guide bearbeiten</h2>

    <label>Titel:</label>
    <input v-model="guide.title" placeholder="Guide-Titel..." />

    <label>OP-Codes (temporär):</label>
    <input v-model="opCodesText" placeholder="z.B. 51220300, 51220800" @blur="updateOpCodes" />

    <div class="steps">
      <h3>📌 Schritte (Steps)</h3>

      <div v-for="step in guide.steps" :key="step.id" class="step-block">
        <h4>Step {{ step.step }}</h4>
        <label>Fragentitel:</label>
        <input v-model="step.questionTitle" />

        <label>Beschreibung:</label>
        <textarea v-model="step.description"></textarea>

        <label>Frage:</label>
        <textarea v-model="step.question"></textarea>

        <div class="option-row" v-for="option in step.options" :key="option.id">
          <input
              v-model="option.label"
              placeholder="Antwort-Label (z. Ja, Nein)"
          />
          <!-- list of steps. uuid is used as target-id -->
          <select v-model="option.target">
            <option disabled value="">Ziel-Schritt wählen</option>
            <option
                v-for="s in guide.steps"
                :key="s.id"
                :value="s.id"
            >
              {{ s.questionTitle || 'Unbenannter Schritt' }}
            </option>
          </select>
        </div>

        <button @click="addOption(step)">+ Neue Option</button>

      </div>

      <button @click="addStep">+ Neuer Schritt</button>
    </div>

  </div>
</template>

<style scoped>
input {
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
}

.option-row {
  display: flex;
  gap: 1em;
  margin-bottom: 0.5em;
}
.option-row input,
.option-row select {
  flex: 1;
}
</style>
