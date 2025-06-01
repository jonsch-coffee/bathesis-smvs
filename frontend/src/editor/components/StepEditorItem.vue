<!--

Let's the user define which step should be taken next. It automatically refreshes the title
displayed in the dropdown-menu. Using anchor-links the user can jump directly to the selected element.

-->
<script setup>
import { computed } from 'vue'
import { useGuideStore } from '../stores/guideStore'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps({
  index: Number
})

const guideStore = useGuideStore()
const step = computed(() => guideStore.guide.steps[props.index])
const allSteps = computed(() =>
    guideStore.guide.steps.filter((_, i) => i !== props.index)
) // Exclude selected step in selectable options

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
  <div class="card mb-3" :id="`step-${step.id}`"> <!-- anchor id-->
    <div class="card-body">

      <input
          class="form-control mb-2"
          v-model="step.questionTitle"
          placeholder="Titel"
      />

      <textarea
          class="form-control mb-2"
          v-model="step.description"
          placeholder="Beschreibung"
          rows="10"
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
              {{ s.questionTitle || `Schritt ohne Titel!` }}
            </option>
          </select>

          <button
              class="btn btn-sm btn-outline-danger mt-2"
              @click="removeOption(option.id)"
          >
            🗑️ Option löschen
          </button>

          <a
              v-if="option.target"
              class="btn btn-sm btn-outline-secondary mt-2 ms-2"
              :href="`#step-${option.target}`"
          >
            🔗 Gehe zu
          </a> <!-- anchor-link -->
        </div>

        <button
            class="btn btn-sm btn-outline-danger mt-2"
            @click="guideStore.removeStepById(step.id)"
        >
          🗑️ Schritt löschen
        </button>

        <button class="btn btn-sm btn-outline-primary mt-2" @click="addOption" style="margin-left: 8px">
          ➕ Option hinzufügen
        </button>

      </div>
    </div>
  </div>
</template>