<script setup>
/* eslint-disable */
import { toRefs } from 'vue'
import OptionEditorComponent from './OptionEditorComponent.vue'
import { v4 as uuidv4 } from 'uuid'

const props = defineProps(['step', 'steps'])

function addOption() {
  props.step.options.push({
    id: uuidv4(),
    label: '',
    target: ''
  })
}
</script>

<template>
  <div class="step" style="border: 3px solid darkred; margin-top: 10px;">
    <input class="form-control" v-model="step.questionTitle" placeholder="Titel des Schritts" :id="step.id" />
    <textarea class="form-control" rows="6" v-model="step.description" placeholder="Frage..." />
    <div style="border: 3px solid grey">
      <OptionEditorComponent
          v-for="o in step.options"
          :key="o.id"
          :option="o"
          :available-steps="steps"
      />
    </div>
    <button @click="addOption">➕ Option</button>
  </div>
</template>
