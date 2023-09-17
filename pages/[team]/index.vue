<script setup>
import { useRoute, useRouter } from '#app'
import teams from '~/api/data/teamsdata.json'

const route = useRoute()
const router = useRouter()
const routeName = ref(route.params.team)

const isRealTeam = computed(() => {
  return !!teams.filter(team => team.name.toLowerCase() === routeName.value)
})

const teamTasks = computed(() => {
  return teams.filter(team => team.name.toLowerCase() === routeName.value)[0]
})

onMounted(() => {
  routeName.value = route.params.team
  console.log(routeName)
  console.log(teamTasks)
})
</script>

<template>
  <div v-for="task in teamTasks.tasks">
    <NuxtLink :to="`/team1/${task.slug}`">{{ task.number }}</NuxtLink>
  </div>
</template>

<style scoped>

</style>