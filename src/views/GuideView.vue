

<script setup>
/* eslint-disable */
import { useRoute } from 'vue-router'
import GuideService from '@/services/guideService'
import { ref, onMounted} from "vue";
const route = useRoute()
const guideId = route.params.id
//const opCode = route.query.code
const guide = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await GuideService.getGuideElement(guideId)
    guide.value = data
  } finally {
    loading.value = false
  }
})

/*
onMounted(() => {
  GuideService.getGuideElement(guideId)
      .then((response) => {
        guide.value = response.data
      })
      .catch((error) => {
        console.log(error)
      })
})*/
</script>

<template>Hi
  <div v-if="loading">
    <p>Lade Daten…</p>
  </div>
  <div v-else>
    <h1>{{ guide.title }}</h1>
  </div>


  <pre> {{ guide }}</pre>
</template>
