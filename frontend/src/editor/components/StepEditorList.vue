<!--

Uses the StepEditorItem. Allows the user to add new steps.

-->
<script setup>
import { computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

import { useGuideStore } from '../stores/guideStore'
import StepEditorItem from './StepEditorItem.vue'

const guideStore = useGuideStore()
const steps = computed(() => guideStore.guide.steps)

function addStep() {
  steps.value.push({
    id: uuidv4(),
    questionTitle: `Schritt ${steps.value.length + 1}`,
    description: '',
    options: []
  })
}
</script>

<template>
  <div>
    <h4>Schritte</h4>

    <div v-if="!steps.length" class="text-muted">
      Keine Schritte vorhanden.
    </div>

    <StepEditorItem
        v-for="(step, index) in steps"
        :key="step.id"
        :index="index"
    />

    <button class="btn btn-outline-primary mt-3" @click="addStep">
      ➕ Schritt hinzufügen
    </button>
  </div>
</template>