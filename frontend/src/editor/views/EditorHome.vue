<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { useEditorApiClient } from '../composables/useEditorApiClient'
import { getAllGuides } from '@/shared/services/guideService'
import { useGuideStore } from '../composables/useGuideStore'
import { useAutoSaveGuide } from '../composables/useAutoSaveGuide'
import { updateGuide } from '../services/guideEditService'

import StepEditorList from '../components/StepEditorList'

const api = useEditorApiClient()
const {
  allGuides,
  selectedGuideId,
  guide,
  selectGuideById,
  createNewGuide,
  deleteGuide
} = useGuideStore()

const steps = ref([])
watchEffect(() => {
  steps.value = guide.steps ?? []
})

function updateStep(index, updatedStep) {
  steps.value[index] = { ...updatedStep }
}

onMounted(async () => {
  try {
    const response = await getAllGuides(api)
    allGuides.value = response.data
  } catch (err) {
    console.error('API error:', err)
  }
})

useAutoSaveGuide(guide, (guide) => updateGuide(api, guide))
</script>

<template>
  <div class="container mt-4">
    <h2>Guide Editor</h2>

    <!-- Guide-Auswahl -->
    <select class="form-select mb-3" v-model="selectedGuideId" @change="selectGuideById(selectedGuideId)">
      <option disabled value="">-- Guide wählen --</option>
      <option v-for="g in allGuides" :key="g.id" :value="g.id">{{ g.title }}</option>
    </select>

    <div class="btn-group mb-4">
      <button class="btn btn-success" @click="createNewGuide">➕ Neuer Guide</button>
      <button class="btn btn-danger" @click="deleteGuide" :disabled="!selectedGuideId">🗑️ Löschen</button>
    </div>

    <!-- Aktueller Guide -->
    <div v-if="guide">
      <label>Titel</label>
      <input class="form-control mb-3" v-model="guide.title" placeholder="Titel des Guides" />

      <p><strong>ID:</strong> {{ guide.id }}</p>
      <p><strong>Anzahl Schritte:</strong> {{ guide.steps.length }}</p>

      <StepEditorList
        :steps="steps"
        @add="steps.value.push({
          id: Date.now(),
          questionTitle: `Schritt ${steps.value.length + 1}`,
          description: '',
          options: []
        })"
        @updateStep="updateStep"
      />
      <!-- Weitere Komponenten wie StepEditor, OpCodeManager etc. folgen hier -->
    </div>


  </div>
</template>