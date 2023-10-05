<template>
  <Header :background="backgroundColor" />
  <div class="container" :style="{ backgroundColor }">
    <slot />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "#app";
import teams from "~/api/data/teamsdata.json";
import Header from "~/components/Header.vue";

const route = useRoute()
const router = useRouter()
const routeTeamParams = ref(router.currentRoute.value.params.team)

const team = computed(() => {
  return teams.filter(team => team.name === routeTeamParams.value.toLowerCase())[0]
})
const backgroundColor = computed(() => {
  return team.value?.background
})
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>