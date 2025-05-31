<script setup>
import { ref, computed, defineProps } from 'vue'
import {
  BModal,
  BButton, BFormGroup, BInputGroup, BFormInput
} from 'bootstrap-vue-next'
import {storeToRefs} from "pinia";
import { useGuideStore } from '../stores/guideStore'

defineProps({
  isDiabled: Boolean
})

const modal = ref(false)

const guideStore = useGuideStore()
const { guide, allGuides } = storeToRefs(guideStore)

const newOpCode = ref('')
const opCodeError = ref('')

const associatedCodes = computed(() => guide.value.opCodes || [])

function addNewOpCode() {
  const code = newOpCode.value.trim()
  opCodeError.value = ''

  if (!/^[0-9]{8}$/.test(code)) {
    opCodeError.value = 'Der OP-Code muss genau 8 Ziffern enthalten.'
    return
  }

  const existingGuide = allGuides.value.find(g => g.opCodes.includes(code))
  if (existingGuide) {
    opCodeError.value = `Operation-Code bereits verknüpft mit "${existingGuide.title}"`
    return
  }

  guide.value.opCodes.push(code)
  newOpCode.value = ''
}

function removeOpCode(code) {
  guide.value.opCodes = guide.value.opCodes.filter(c => c !== code)
}

</script>

<template>
  <BButton variant="primary" @click="modal = !modal" :disabled="isDiabled">
    Operation-Codes
  </BButton>

  <BModal id="opcode-modal" title="Operation-Codes zuweisen" v-model="modal">
    <div v-if="associatedCodes.length === 0" class="mb-3 text-muted">
      Noch keine Operation-Codes definiert
    </div>

    <ul v-else class="list-group mb-3">
      <li v-for="code in associatedCodes" :key="code" class="list-group-item d-flex justify-content-between align-items-center">
        {{ code }}
        <BButton size="sm" variant="danger" @click="removeOpCode(code)">Entfernen</BButton>
      </li>
    </ul>

    <BFormGroup label="Neuen OP-Code hinzufügen:" label-for="op-code-input">
      <BInputGroup>
        <BFormInput id="op-code-input" v-model="newOpCode" maxlength="8" placeholder="z.B. 51220300" />
        <BButton variant="success" @click="addNewOpCode">➕ Hinzufügen</BButton>
      </BInputGroup>
    </BFormGroup>

    <p class="text-danger mt-2" v-if="opCodeError">{{ opCodeError }}</p>

  </BModal>
</template>



<style scoped>
.text-muted {
  font-size: 0.85rem;
}
</style>
