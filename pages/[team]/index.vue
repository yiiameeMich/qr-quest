<script setup>
import { definePageMeta } from "nuxt/dist/pages/runtime/index.js";

definePageMeta({
  middleware: [
    function () {
      return navigateTo({
        path: '/',
      })
    }
  ],
})
</script>

<template>
  <div />
</template>

<style scoped>

</style>