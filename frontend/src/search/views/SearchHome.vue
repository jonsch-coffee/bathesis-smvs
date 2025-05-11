<script setup>

  import { ref, watch } from 'vue'

  // API
  import { useSearchApiClient } from '../composables/useSearchApiClient'
  import { getGuideSuggestions } from '@/shared/services/guideService'

  import GuideDetails from './GuideDetails.vue'

  const api = useSearchApiClient()

  const query = ref('')
  const error = ref(false)
  const suggestions = ref([])

  const selectedGuideId = ref('')

  function checkSearchInput() {
    const match = suggestions.value.find(s => s.code === query.value)
    if (match) {
      selectedGuideId.value = match.guideId
    } else {
      error.value = true
    }
  }

  watch(query, async (newValue) => {
    error.value = false
    if (newValue.length >= 1) {
      try {
        const { data } = await getGuideSuggestions(api, newValue)
        suggestions.value = data
      } catch (e) {
        console.error(e)
        suggestions.value = []
      }
    } else {
      suggestions.value = []
    }
  })

</script>


<template>
  <div class="w-100 w-md-75 mx-auto">
    <div v-if="!selectedGuideId">
      <div class="alert alert-warning" v-if="error">
        Operation-Code not found!
      </div>

      <input
          v-model="query"
          type="text"
          class="form-control mb-3"
          placeholder="Enter Operation-Code"
          @keydown.enter="checkSearchInput"
      />

      <ul class="list-group" v-if="suggestions.length">
        <li
            v-for="s in suggestions"
            :key="s.code"
            class="list-group-item list-group-item-action"
            @click="selectedGuideId = s.guideId"
        >
          {{ s.code }}
        </li>
      </ul>
    </div>

    <div v-else>
      <GuideDetails
          :guideId="selectedGuideId"
          @back="selectedGuideId = false"
      />
    </div>
  </div>
</template>