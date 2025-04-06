

<script setup>
/* eslint-disable */
import { useRoute } from 'vue-router'
import GuideService from '@/services/guideService'
import { ref } from "vue";

const route = useRoute()
const guideId = route.params.id
//const opCode = route.query.code

const guide = ref({
  loading: true,
  error: false,
  data: {
    title: 'Loading...',
    opCodes: [],
    steps: []
  }
})

GuideService.getGuideElement(guideId)
    .then((response) => {
      guide.value.loading = false
      guide.value.data = response.data
    })
    .catch((error) => {
      console.log(error)
      guide.value.loading = false
      guide.value.error = true
    })

</script>

<template>
  <h1>{{ guide.data.title }}</h1>
  <p>{{ guide.data.opCodes }}</p>
  <pre>{{ guide.loading ? '' : guide.data }}</pre>
</template>
