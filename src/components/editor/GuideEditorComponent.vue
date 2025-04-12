<script setup>
/* eslint-disable */
import {reactive, ref, onMounted, watch, computed} from 'vue'
import { v4 as uuidv4 } from 'uuid'

import StepEditorComponent from './StepEditorComponent.vue'
import GuideService from '@/services/guideService'

const LOCAL_KEY_GUIDES = 'smvs_guides'
const LOCAL_KEY_OPCODES = "opcodes"
const allGuides = ref([])
const selectedGuideId = ref(null)

const opcodes = ref([]) // global list with all opcodes
const newOpCode = ref('') // new opcode that is added
const opCodeError = ref('') // stores errors related to adding new opcodes
const opCodeSearch = ref('') // search-results

const hasChanges = ref(false) // Notify user wether changes have occured

const guide = reactive({
  id: uuidv4(),
  title: '',
  steps: [],
  opCodes: []
})

const filteredOpcodes = computed(() => {
  if (!opCodeSearch.value) return opcodes.value
  return opcodes.value.filter(code =>
      code.includes(opCodeSearch.value)
  )
})


//Startup
onMounted(async () => {
  const cachedGuides = localStorage.getItem(LOCAL_KEY_GUIDES)
  const cachedOpCodes = localStorage.getItem(LOCAL_KEY_OPCODES)
  if (cachedGuides && cachedOpCodes) { // if no cached aka edited data fetch from api
    allGuides.value = JSON.parse(cachedGuides)
    opcodes.value = JSON.parse(cachedOpCodes)
  } else {
    const { data } = await GuideService.getAllGuides()
    allGuides.value = data
    localStorage.setItem(LOCAL_KEY_GUIDES, JSON.stringify(data)) // Create a copy of remote-data

    // Flatten and dedupe opcodes
    const opSet = new Set()
    data.forEach(guide => {
      guide.opCodes?.forEach(code => opSet.add(code))
    })
    opcodes.value = Array.from(opSet)
    localStorage.setItem(LOCAL_KEY_OPCODES, JSON.stringify(opcodes.value))
  }
})

function loadGuide() {
  const selected = allGuides.value.find(g => g.id === selectedGuideId.value)
  if (!selected) return
  Object.assign(guide, JSON.parse(JSON.stringify(selected))) // Deep-clone to break references
}

function createNewGuide() {
  const newGuide = {
    id: Date.now(),
    title: '',
    steps: [],
    opCodes: []
  }
  allGuides.value.push(newGuide)
  localStorage.setItem(LOCAL_KEY_GUIDES, JSON.stringify(allGuides.value))
  selectedGuideId.value = newGuide.id
  Object.assign(guide, newGuide)
}

function addStep() {
  guide.steps.push({
    id: uuidv4(),
    questionTitle: `Schritt ${guide.steps.length + 1}`,
    description: '',
    options: []
  })
}

// Validate input. An Operation Code has to contain exact 8 numbers.
function addOpCode(code) {
  opCodeError.value = ''

  // Trim & validate
  const trimmed = code.trim()

  if (!/^\d{8}$/.test(trimmed)) {
    opCodeError.value = 'Der OP-Code muss genau 8 Ziffern enthalten.'
    return
  }

  if (opcodes.value.includes(trimmed)) {
    opCodeError.value = 'Dieser OP-Code ist bereits vorhanden.'
    return
  }

  opcodes.value.push(trimmed)
  newOpCode.value = ''

  localStorage.setItem(LOCAL_KEY_OPCODES, JSON.stringify(opcodes.value)) // Store OP-Code locally
}


function clearLocalStorage() {
  if (confirm('Möchtest du die Änderungen wirklich löschen?')) {
    localStorage.removeItem(LOCAL_KEY_GUIDES)
    localStorage.removeItem(LOCAL_KEY_OPCODES)
    location.reload()
  }
}

//Watches - haha - the guide data-object. If changes occur they are stored locally
watch(guide, () => {
  //const local = JSON.stringify(guide)
  hasChanges.value = true // Remind user to export the data
  const i = allGuides.value.findIndex(g => g.id === guide.id)
  if (i !== -1) {
    allGuides.value[i] = JSON.parse(JSON.stringify(guide))
    localStorage.setItem(LOCAL_KEY_GUIDES, JSON.stringify(allGuides.value))
  }
}, { deep: true })


watch(opcodes, () => {
  hasChanges.value = true // Remind user to export the data
})


function notUsed(code) {
  return allGuides.value.filter(g => g.opCodes.includes(code)).length === 0
}

function isCodeAssignedToAnotherGuide(code) {
  return allGuides.value.some(g =>
      g.opCodes.includes(code) && g.id !== guide.id
  )
}


function handleCodeChange(event, code) {
  const isChecked = event.target.checked
  const assignedTo =
        allGuides.value.find(g =>
              g.opCodes.includes(code) && // check if the opcode is used in the currently compared guide element
              g.id !== guide.id // but not the current guide worked on
        )

  if (isChecked && assignedTo) {
    alert(`OP-Code ${code} ist bereits Guide "${assignedTo.title}" zugewiesen.`)
    event.target.checked = false // uncheck the checkbox
    return // quit function
  }

  if (isChecked) { // if is checked and not interrupted push to guide-element opcodes
    guide.opCodes.push(code)
  } else {
    guide.opCodes = guide.opCodes.filter(c => c !== code)
  }
}

function exportLocalStorageData() {
  const guides = JSON.parse(localStorage.getItem('smvs_guides') || '[]')

  // Extrahiere alle OpCodes mit Referenz zum Guide
  const opcodes = guides.flatMap(guide =>
      (guide.opCodes || []).map(code => ({
        code,
        guideId: guide.id
      }))
  )

  const exportData = {
    guides,
    opcodes
  }

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: 'application/json'
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = uuidv4() + '-export.json'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}


</script>

<template>
  <br>
  <h2>Guide Editor</h2>
  <br>

  <select class="form-select" v-model="selectedGuideId" @change="loadGuide">
    <option disabled value="">-- Guide wählen --</option>
    <option v-for="g in allGuides" :key="g.id" :value="g.id">{{ g.title }}</option>
  </select>
  <div class="btn-group" role="group" >
    <button class="btn btn-info" @click="createNewGuide">➕</button>
    <button class="btn btn-info" @click="exportLocalStorageData">📦</button>
    <button class="btn btn-danger" @click="clearLocalStorage">🧹</button>
  </div>
  <hr>
  <div class="row g-0">

    <div class="col-sm-6 col-md-8">
      <input v-model="guide.title" placeholder="Guide-Titel" class="form-control" /><br>
      <StepEditorComponent v-for="s in guide.steps" :key="s.id" :step="s" :steps="guide.steps" />
      <button @click="addStep">➕ Schritt</button>
    </div>

    <!-- Right menu -->
    <div class="col-6 col-md-4" style="  border-left: 3px solid black; padding-left: 10px;  ">
      <h4>Operation Codes</h4>
      <input v-model="newOpCode" placeholder="z.B. 51220300" />
      <button @click="addOpCode(newOpCode)">➕ Hinzufügen</button>

      <p v-if="opCodeError" style="color: red;">{{ opCodeError }}</p>

      <!-- Select OP-Code -->
      <div class="opcodes-select">
        <input v-model="opCodeSearch" placeholder="OP-Code suchen..." />

        <div v-for="code in filteredOpcodes" :key="code" >
          <label>
            <input
                type="checkbox"
                :value="code"
                :checked="guide.opCodes.includes(code)"
                :disabled="isCodeAssignedToAnotherGuide(code)"
                @change="handleCodeChange($event, code)"

            />
            {{ code }}
            <span v-if="notUsed(code)" style="color: blue;"> (nicht zugewiesen)</span>
          </label>
        </div>
      </div>
    </div>
  </div>

</template>
