<script setup>
import { ref, computed } from "vue"
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
const backgroundColor = computed(() => {
  return teams[teamIndex.value - 1].background
})
const color = computed(() => {
  return teams[teamIndex.value - 1].color
})

const correct = ref(null);
const needHelp = ref(false);
const answerShown = ref(false);

const selectAnswer = (option) => {
  if (option === task.correct_answer) {
    correct.value = true
  } else if (option !== task.correct_answer && !needHelp.value) {
    needHelp.value = true
  } else {
    answerShown.value = true
  }
}
</script>

<template>
  <div class="wrapper">
    <p :style="{ color }">{{ task.content }}</p>
    <div class="btns">
      <button v-for="(option, idx) in task.options.all" :key="idx" @click="selectAnswer(option)">
        {{ option }}
      </button>
    </div>
    <div v-if="needHelp">
      Підказка: {{ task.tip }}
    </div>
    <div v-if="answerShown">
      Невірно :(
      <br>
      Відповідь: {{ task.correct_answer }}
    </div>
  </div>
</template>

<style lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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

  .btns {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 25px;
    width: 75%;
    margin: 20px 0;
    button {
      width: 30%;
      height: 40px;
      padding: 10px 12px;
      background-color: v-bind(color);
      border-radius: 8px;
      border: 1px solid v-bind(color);
      transition: 0.3s;
      font-size: 15px;
      color: v-bind(backgroundColor);
      &:hover {
        opacity: 0.7;
      }
    }
  }

  div {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px 0;
    line-height: 130%;
    letter-spacing: 0.8px;
    color: v-bind(backgroundColor);
  }
}
</style>