<script setup>
import MarkdownIt from 'markdown-it'
import {computed} from "vue";

const markdown = new MarkdownIt() // Markdown

const props = defineProps({
  questionTitle: String,
  description: String
})

const renderedDescription = computed(() => markdown.render(props.description || '')) // renders markdown-text

</script>

<template>
  <div>
    <p class="lead mt-3">{{ questionTitle }}</p>
    <hr class="my-4">
    <div v-html="renderedDescription" />
  </div>
</template>