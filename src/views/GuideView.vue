

<script setup>
/* eslint-disable */
import { useRoute } from 'vue-router'
import guideService from '@/services/guideService'
import {onMounted} from "vue";
const route = useRoute()
const guideId = route.params.id
//const opCode = route.query.code
 const guide = ref(null)
onMounted(async () => {
  try {
    const {data} = await guideService.getGuideElement(guideId)
    guide.value = data
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <h1>Guide {{ guideId }}</h1>
  <!--<p>OP-Code: {{ opCode }}</p> -->
</template>
