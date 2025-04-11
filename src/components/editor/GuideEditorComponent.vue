<script setup>
import { reactive } from 'vue'
import StepEditorComponent from './StepEditorComponent.vue'
import { v4 as uuidv4 } from 'uuid'


const guide = reactive({
  title: 'Neuer Guide',
  steps: []
})

function addStep() {
  guide.steps.push({
    id: uuidv4(),
    title: `Schritt ${guide.steps.length + 1}`,
    question: '',
    options: []
  })
}
</script>

<template>
  <h2>Guide bearbeiten</h2>
  <input v-model="guide.title" placeholder="Guide-Titel" />
  <StepEditorComponent v-for="s in guide.steps" :key="s.id" :step="s" :steps="guide.steps" />
  <button @click="addStep">+ Schritt hinzufügen</button>
</template>
