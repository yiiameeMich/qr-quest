<template>
  <h1>text</h1>
</template>

<script setup>
import { useRoute } from '#app'
import teams from '~/api/data/teamsdata.json'

const route = useRoute()

onMounted(async () => {
  console.log(teams)
  console.log(route)
})
</script>

<style scoped>

</style>