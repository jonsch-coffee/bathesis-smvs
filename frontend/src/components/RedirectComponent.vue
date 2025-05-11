<script setup>/* eslint-disable */

import { useRoute, useRouter } from 'vue-router'
import {ref} from "vue";
import GuideService from "@/services/guideServiceDeprecated";

const route = useRoute()
const router = useRouter()
const opcode = route.params.opcode

const responseObject = ref({
  error: false,
  guideNotFound: false,
  data: {}
})

const response = null

GuideService.getGuideFromOPCode(opcode)
    .then((response) => {
      responseObject.value.data = response.data[0] || {} // fallback falls leer

      if (responseObject.value.data.guideId) {
        router.replace(`/guide/${responseObject.value.data.guideId}`)
      } else {
        responseObject.value.guideNotFound = true
        console.warn('Kein passender Guide gefunden.')
      }
    })
    .catch((error) => {
      console.log(error)
      responseObject.error = true
    })
</script>
<template>
  {{ responseObject.guideNotFound ? 'Kein passender Guide zum eingegebenen Operationcode gefunden!' : '' }}
</template>