

<script setup>
/* eslint-disable */
import TypeAheadComponent from '@/components/TypeAheadComponent.vue'
import owlImage from "@/assets/images/op-owl.png";

</script>

<template>
  <div class="container">
    <div class="row d-flex align-items-center">
      <div class="col col-md-auto"><img class="op-owl" :src="owlImage" alt="OP Owl by ChatGPT" />
      </div>
      <div class="col"><TypeAheadComponent /></div>

      </div>
  </div>
</template>