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

  function handleSearchInput() {
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
        error.value = true
        suggestions.value = []
      }
    } else {
      suggestions.value = []
    }
  })

</script>


<template>
  <div>
    <div v-if="!selectedGuideId">
      <div class="container justify-content-center" style="max-width: 500px;">
        <div class="row" style="margin-top: 15px">
          <div class="alert alert-warning" v-if="error">
            Es konnte kein passender Operation-Code gefunden werden!
          </div>
        </div>

        <div class="row">
          <v-otp-input
              ref="otpInput"
              input-classes="otp-input"
              :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']"
              separator=" "
              inputType="letter-numeric"
              :num-inputs="8"
              v-model:value="query"
              :should-auto-focus="true"
              :should-focus-order="true"
              @on-complete="handleSearchInput"
              :placeholder="['0', '0', '0', '0', '0', '0', '0', '0']"
          />
        </div>

        <div class="row" style="margin-top: 15px; width: 390px;">
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

      </div>
    </div>

    <!-- Show step-by-step guide as soon as an operation-cpde has been selected -->
    <div v-else>
      <GuideDetails
          :guideId="selectedGuideId"
          @back="selectedGuideId = false"
      />
    </div>
  </div>
</template>

<style>
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 2px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
/* Background colour of an input field with value */
.otp-input.is-complete {
  background-color: #e4e4e4;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>
