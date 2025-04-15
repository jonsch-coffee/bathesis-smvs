

<script setup>
/* eslint-disable */
import TypeAheadComponent from '@/components/TypeAheadComponent.vue'
import owlImage from "@/assets/images/op-owl.png";

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col"></div>
      <div class="col-6">
        <img class="op-owl" :src="owlImage" alt="OP Owl by ChatGPT" />
        <TypeAheadComponent />
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>