

<script setup>
/* eslint-disable */
import TypeAheadComponent from '@/components/TypeAheadComponent.vue'
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center">
    <button @click="router.push('/editor')">Editor öffnen</button>
  </div>
</template>