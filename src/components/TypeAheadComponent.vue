
<script setup>
//getGuideSuggestions

/* eslint-disable */
import { useRouter } from 'vue-router'
import { ref, watch } from "vue";

import GuideService from '@/services/guideService'
// TODO put in TypeAheadComponent-Component
const router = useRouter()
const query = ref('')
const suggestions = ref([])

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

function goToGuide(guideId) {
  router.push(`/guide/${guideId}`)
}

</script>

<template>


    <input
        type="text"
        v-model="query"
        placeholder="OP-Code eingeben..."
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

</template>