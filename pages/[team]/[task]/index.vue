<script setup>
import { useRoute } from '#app'
import teams from '~/api/data/teamsdata.json'

const route = useRoute()

const routeTeamParams = ref(route.params.team)
const routeTaskParams = ref(route.params.task)

const teamIndex = computed(() => {
  return routeTeamParams.value.slice(-1)
})

const eachTeamTasks = computed(() => {
  return teams.map(team => team.tasks)
})

const tasks = computed(() => {
  return eachTeamTasks.value[teamIndex.value - 1]
})

const task = computed(() => {
  return tasks.value.filter(task => {
    return task.slug === `${routeTaskParams.value}`
  })[0]
})

const color = computed(() => {
  return teams[teamIndex.value - 1].color
})
</script>

<template>
  <div class="wrapper">
    <p :style="{ color }">{{ task.content }}</p>
  </div>
</template>

<style lang="scss">
.wrapper {
  width: 100%;
  height: 100%;

  p {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 21px;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-align: center;
  }
}
</style>