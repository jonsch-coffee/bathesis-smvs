<script setup>
//getGuideSuggestions

/* eslint-disable */
import { useRouter } from 'vue-router'
import {computed, ref, watch} from "vue";

import GuideService from '@/services/guideServiceDeprecated'
// TODO put in TypeAheadComponent-Component
const router = useRouter()
const query = ref('')
const error = ref(false)
const suggestions = ref([])
const queryLength = computed(() => {
  return query.value.length === 8
})

watch(query, async (newValue) => {
  if (newValue.length >= 1) {
    try {
      const { data } = await GuideService.getGuideSuggestions(newValue)
      suggestions.value = data
    } catch (e) {
      console.error(e)
      suggestions.value = []
    }
  } else {
    suggestions.value = []
  }
})

function checkSearchInput() {
  const match = suggestions.value.find((v) => v.code === query.value)
  if (match) {
    goToGuide(match.guideId)
  } else {
    error.value = true
  }
}

function goToGuide(guideId) {
  router.push(`/guide/${guideId}`)
}

const modal = ref(false)

</script>

<template>
  <!-- Source "sizing" https://getbootstrap.com/docs/4.0/utilities/sizing/ -->
  <div class="w-75">
    <div class="alert alert-warning" role="alert" v-if="error">
      Operation-Code could not be found.
    </div>


    <input
        type="text"
        v-model="query"
        placeholder="Enter OP-Code from alert"
        class="form-control mb-3"
    />

    <ul class="list-group" v-if="suggestions.length">
      <li
          v-for="s in suggestions"
          :key="s.code"
          class="list-group-item list-group-item-action"
          @click="goToGuide(s.guideId)"
      >
        {{ s.code }}
      </li>
    </ul>



  </div>



</template>