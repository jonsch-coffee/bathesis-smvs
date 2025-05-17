<script setup>
import { onMounted, watch } from 'vue'
import { useEditorApiClient } from '../composables/useEditorApiClient'
import { getAllGuides } from '@/shared/services/guideService'

import { storeToRefs } from "pinia";
import { useAutoSaveGuide } from '../composables/useAutoSaveGuide'
import {updateGuide, createGuide, deleteGuide} from '../services/guideEditService'

import StepEditorList from '../components/StepEditorList'
import { useGuideStore } from "@/editor/stores/guideStore";

const api = useEditorApiClient()

const guideStore = useGuideStore()
const {
  allGuides,
  selectedGuideId,
  guide
} = storeToRefs(guideStore)

onMounted(async () => {
  try {
    const response = await getAllGuides(api)
    guideStore.setAllGuides(response.data)
  } catch (err) {
    console.error('API error:', err)
  }
})

watch(selectedGuideId, (newId) => {
  console.log('🌀 Neuer Guide ausgewählt:', newId)
  guideStore.selectGuideById(newId)
})

useAutoSaveGuide(guide, {
  saveFn: (guide) => updateGuide(api, guide),
  updateLocal: (guide) => guideStore.updateGuideLocally(guide)
})

async function handleCreateGuide() {
  const title = window.prompt('Gib einen Titel für den neuen Guide ein:')
  try {
    const res = await createGuide(api, title)
    console.log('Neuer Guide:', res.data)
    guideStore.createNewGuide(res.data)
  } catch (e) {
    alert('Fehler beim Erstellen des neuen Guides!')
  }
}

async function handleDeleteGuide() {
  const confirmed = confirm('Diesen Guide wirklich löschen?')
  if (!confirmed) return
  try {
    const response = await deleteGuide(api, selectedGuideId.value)
    if(response) {
      guideStore.deleteGuide(selectedGuideId)
      alert('Guide erfolgreich gelöscht. Bitte nun einen neuen aus der Liste unter Guide Editor auswählen.')
    }
  } catch (err) {
    alert('Guide konnte nicht gelöscht werden!')
  }
}


</script>

<template>
  <div class="container mt-4">
    <h2>Guide Editor</h2>
    <select class="form-select mb-3" v-model="selectedGuideId">
      <option disabled value="">-- Guide wählen --</option>
      <option v-for="g in allGuides" :key="g.id" :value="g.id">{{ g.title }}</option>
    </select>

    <div class="btn-group mb-4">
      <button class="btn btn-success" @click="handleCreateGuide">➕ Neuer Guide</button>
      <button class="btn btn-danger" @click="handleDeleteGuide" :disabled="!selectedGuideId">🗑️ Löschen</button>
    </div>

    <!-- Aktueller Guide -->
    <div v-if="guide.title !== ''">
      <label>Titel</label>
      <input class="form-control mb-3" v-model="guide.title" placeholder="Titel des Guides" />

      <p><strong>ID:</strong> {{ guide.id }}</p>
      <p><strong>Anzahl Schritte:</strong> {{ guide.steps.length }}</p>

      <StepEditorList />

    </div>


  </div>
</template>