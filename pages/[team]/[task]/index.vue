<script setup>
import teams from '~/api/data/teamsdata.json'

const tasks = computed(() => {
  return teams.map(team => team.tasks)
})

onMounted(() => {
  console.log(tasks.value)
})
</script>

<template>
  <div v-for="task in tasks">
    <p>{{ task[0].content }}</p>
  </div>
</template>

<style scoped>

</style>