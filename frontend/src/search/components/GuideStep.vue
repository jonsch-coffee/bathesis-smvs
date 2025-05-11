<script setup>
import MarkdownIt from 'markdown-it'
// eslint-disable-next-line
const markdown = new MarkdownIt()
// eslint-disable-next-line
const props = defineProps({
  questionTitle: String,
  description: String
})

const renderedDescription = markdown.render(props.description)

</script>

<template>
  <div>
    <p class="lead mt-3">{{ questionTitle }}</p>
    <hr class="my-4">
    <div v-html="renderedDescription" />
  </div>
</template>