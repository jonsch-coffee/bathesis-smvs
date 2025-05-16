<script setup>
import StepEditorItem from './StepEditorItem.vue'

// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  steps: {
    type: Object, // Expecting a Ref (like computed)
    required: true
  }
})

// eslint-disable-next-line no-undef
const emit = defineEmits(['add', 'updateStep'])

function addStep() {
  emit('add')
}

function updateStep(index, updatedStep) {
  emit('updateStep', index, updatedStep)
}
</script>

<template>
  <div>
    <h4>Schritte</h4>
    <div v-if="!steps.length" class="text-muted">Keine Schritte vorhanden.</div>

    <StepEditorItem
        v-for="(step, index) in steps"
        :key="step.id"
        :step="step"
        :index="index"
        @update="updateStep"
    />

    <button class="btn btn-outline-primary mt-3" @click="addStep">➕ Schritt hinzufügen</button>
  </div>
</template>