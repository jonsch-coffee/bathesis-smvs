<script setup>
import { computed } from 'vue'
import { useGuideStore } from '../stores/guideStore'
import { v4 as uuidv4 } from 'uuid'

// eslint-disable-next-line no-undef
const props = defineProps({
  index: Number
})

const store = useGuideStore()

const step = computed(() => store.guide.steps[props.index])

// Den aktuellen Schritt ausschliessen in Optionsauswahl
const allSteps = computed(() =>
    store.guide.steps.filter((_, i) => i !== props.index)
)

function addOption() {
  step.value.options.push({
    id: uuidv4(),
    label: '',
    target: ''
  })
}

function removeOption(optionId) {
  step.value.options = step.value.options.filter(opt => opt.id !== optionId)
}
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title">Schritt {{ index + 1 }}</h5>

      <input
          class="form-control mb-2"
          v-model="step.questionTitle"
          placeholder="Titel"
      />

      <textarea
          class="form-control mb-2"
          v-model="step.description"
          placeholder="Beschreibung"
          rows="3"
      ></textarea>

      <!-- Optionen -->
      <div class="mt-3">
        <h6>Optionen</h6>
        <div
            v-for="option in step.options"
            :key="option.id"
            class="mb-2 border rounded p-2"
        >
          <input
              class="form-control mb-1"
              v-model="option.label"
              placeholder="Label der Option (z.B. Ja / Weiter)"
          />

          <select class="form-select" v-model="option.target">
            <option disabled value="">-- Zielschritt wählen --</option>
            <option
                v-for="s in allSteps"
                :key="s.id"
                :value="s.id"
            >
              {{ s.questionTitle || `Schritt ${s.id}` }}
            </option>
          </select>

          <button
              class="btn btn-sm btn-outline-danger mt-2"
              @click="removeOption(option.id)"
          >
            🗑️ Option löschen
          </button>
        </div>

        <button class="btn btn-sm btn-outline-primary mt-2" @click="addOption">
          ➕ Option hinzufügen
        </button>
      </div>
    </div>
  </div>
</template>