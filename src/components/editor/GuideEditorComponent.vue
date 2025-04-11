<script setup>
/* eslint-disable */
import {reactive, ref, onMounted, watch} from 'vue'
import { v4 as uuidv4 } from 'uuid'

import StepEditorComponent from './StepEditorComponent.vue'
import GuideService from '@/services/guideService'

const LOCAL_KEY = 'smvs_guides'
const allGuides = ref([])
const selectedGuideId = ref(null)

const guide = reactive({
  id: null,
  title: '',
  steps: [],
  opCodes: []
})

onMounted(async () => {
  const cached = localStorage.getItem(LOCAL_KEY)

  if (cached) {
    allGuides.value = JSON.parse(cached)
  } else {
    const { data } = await GuideService.getAllGuides()
    allGuides.value = data
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data))
  }
})

function loadGuide() {
  const selected = allGuides.value.find(g => g.id === selectedGuideId.value)
  if (!selected) return
  Object.assign(guide, JSON.parse(JSON.stringify(selected)))
}

function createNewGuide() {
  const newGuide = {
    id: Date.now(),
    title: '',
    steps: [],
    opCodes: []
  }
  allGuides.value.push(newGuide)
  localStorage.setItem(LOCAL_KEY, JSON.stringify(allGuides.value))
  selectedGuideId.value = newGuide.id
  Object.assign(guide, newGuide)
}

function addStep() {
  guide.steps.push({
    id: uuidv4(),
    title: `Schritt ${guide.steps.length + 1}`,
    question: '',
    options: []
  })
}

watch(guide, () => {
  const i = allGuides.value.findIndex(g => g.id === guide.id)
  if (i !== -1) {
    allGuides.value[i] = JSON.parse(JSON.stringify(guide))
    localStorage.setItem(LOCAL_KEY, JSON.stringify(allGuides.value))
  }
}, { deep: true })

</script>

<template>
  <h2>Guide Editor</h2>

  <select v-model="selectedGuideId" @change="loadGuide">
    <option disabled value="">-- Guide wählen --</option>
    <option v-for="g in allGuides" :key="g.id" :value="g.id">{{ g.title }}</option>
  </select>

  <button @click="createNewGuide">+ Neuer Guide</button>


  <input v-model="guide.title" placeholder="Guide-Titel" />
  <StepEditorComponent v-for="s in guide.steps" :key="s.id" :step="s" :steps="guide.steps" />
  <button @click="addStep">+ Schritt hinzufügen</button>
</template>
