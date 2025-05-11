<script setup>
import { onMounted, ref } from 'vue'
import { useEditorApiClient } from '../composables/useEditorApiClient'
import { getAllGuides } from '@/shared/services/guideService'

const api = useEditorApiClient()
const guide = ref(null)

onMounted(async () => {
  try {
    const response = await getAllGuides(api)
    guide.value = response.data
  } catch (err) {
    console.error('API error:', err)
  }
})
</script>

<template>
  <div v-if="guide">
    <h1>{{ guide }}</h1>
    <!-- usw. -->
  </div>
</template>