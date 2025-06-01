<script setup>
import { onMounted, watch, ref } from 'vue'
import { useEditorApiClient } from '../composables/useEditorApiClient'
import { getAllGuides } from '@/shared/services/guideService'

import { storeToRefs } from "pinia";
import { useAutoSaveGuide } from '../composables/useAutoSaveGuide'
import {updateGuide, createGuide, deleteGuide} from '../services/guideEditService'

import StepEditorList from '../components/StepEditorList'
import { useGuideStore } from "@/editor/stores/guideStore";
import OpCodeManager from "@/editor/components/OpCodeManager.vue";

const api = useEditorApiClient()
const guideStore = useGuideStore()
const {
  allGuides,
  selectedGuideId,
  guide,
  lastSavedAt,
  saveFailed
} = storeToRefs(guideStore)
const currentTime = ref(new Date())

setInterval(() => {
  currentTime.value = new Date()
}, 1000)

onMounted(async () => {
  try {
    const response = await getAllGuides(api)
    guideStore.setAllGuides(response.data)
  } catch (err) {
    alert('Inhalte konnten nicht abgerufen werden! Überprüfen Sie die Entwicklerkonsole für weitere Details mit Windows Strg + Umschalt + J oder F12, und auf Mac Cmd + Option + J oder F12')
    console.error('Inhalte konnten nicht abgerufen werden!', err)
  }
})

watch(selectedGuideId, (newId) => {
  guideStore.selectGuideById(newId)
})

useAutoSaveGuide(guide, {
  updateGuideApi: (guide) => updateGuide(api, guide),
  updateGuideLocal: (guide) => guideStore.updateGuideLocally(guide)
})

async function handleCreateGuide() {
  const title = window.prompt('Gib einen Titel für den neuen Guide ein:')
  try {
    const res = await createGuide(api, title)
    guideStore.createNewGuide(res.data)
  } catch (err) {
    alert('Fehler beim Erstellen des neuen Guides! Überprüfen Sie die Entwicklerkonsole für weitere Details mit Windows Strg + Umschalt + J oder F12, und auf Mac Cmd + Option + J oder F12')
    console.error('Neuer Guide konnten nicht erstellt werden', err)
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
    alert('Guide konnte nicht gelöscht werden! Überprüfen Sie die Entwicklerkonsole für weitere Details mit Windows Strg + Umschalt + J oder F12, und auf Mac Cmd + Option + J oder F12')
    console.error('Guide konnte nicht gelöscht werden!', err)
  }
}

</script>

<template>
  <div class="container mt-4">
    <h2>Editor</h2>
    <select class="form-select mb-3" v-model="selectedGuideId">
      <option disabled value="">-- Guide wählen --</option>
      <option v-for="g in allGuides" :key="g.id" :value="g.id">{{ g.title }}</option>
    </select>

    <div class="btn-group mb-4">
      <button class="btn btn-success" @click="handleCreateGuide">➕ Neu </button>
      <OpCodeManager :isDiabled="!selectedGuideId" />
      <button class="btn btn-danger" @click="handleDeleteGuide" :disabled="!selectedGuideId">🗑️ Löschen</button>
    </div>

    <!-- Last saved -->
    <p
        v-if="lastSavedAt"
        class="text-muted mt-2 fixed-save-info"
        :class="{ 'bg-danger text-white': saveFailed }"
    >
      Zuletzt gespeichert: {{ lastSavedAt.toLocaleTimeString() }}<br>
      Uhrzeit: {{ currentTime.toLocaleTimeString() }}

      <p v-if="saveFailed"><br>
        Editor nicht schliessen ⚠️<br>
        Änderungen konnten nicht gespeichert werden!
      </p>
    </p>

    <!-- Current Guide -->
    <div v-if="guide.title !== ''">
      <hr>
      <label>Titel</label>
      <input class="form-control mb-3" v-model="guide.title" placeholder="Titel des Guides" />
      <hr>

      <StepEditorList />

    </div>


  </div>
</template>

<style scoped>
  .fixed-save-info {
    position: fixed;
    top: 10px;
    right: 20px;
    z-index: 1050;
    background: white;
    padding: 4px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: right;
  }
</style>