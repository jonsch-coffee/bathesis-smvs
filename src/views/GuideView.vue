<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const guideId = route.params.id
const opCode = route.query.code
</script>

<template>
  <h1>Guide {{ guideId }}</h1>
  <p>OP-Code: {{ opCode }}</p>
</template>
