<script setup>
import { ref, computed } from "vue"
import { useRouter } from '#app'
import teams from '~/api/data/teamsdata.json'

const router = useRouter()

const routeTeamParams = ref(router.currentRoute.value.params.team)
const routeTaskParams = ref(router.currentRoute.value.params.task)

const team = computed(() => {
  return teams.filter(team => team.name === routeTeamParams.value.toLowerCase())[0]
})

const tasks = computed(() => {
  return team.value.tasks;
})

const task = computed(() => {
  return tasks.value.filter(task => {
    return task.slug === `${routeTaskParams.value}`
  })[0]
})
const backgroundColor = computed(() => {
  return team.value?.background
})
const color = computed(() => {
  return team.value?.color
})

const correct = ref(null);
const needHelp = ref(false);
const answerShown = ref(false);

const selectAnswer = (option) => {
  needHelp.value = false;
  answerShown.value = false;

  if (option !== task.value.correct_answer) {
    needHelp.value = true
  } else {
    answerShown.value = true
  }
}

const shuffleArray = (array) => {
  let currentIndex = array.length;

  while (currentIndex !== 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    let temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const shuffledTasks = ref([])
const imagePath = ref("")

onMounted(() => {
  if (task.value?.options?.all) {
    shuffledTasks.value = shuffleArray([...task.value.options.all])
  } else if (task.value?.options?.image) {
    imagePath.value = task.value.options.image
  }
})

const contentImage = computed(() => {
  return task.value.content.includes('/images/')
})
</script>

<template>
  <div class="wrapper">
    <!-- question -->
    <p v-if="!contentImage" :style="{ color }">
      {{ task.content }}
    </p>
    <img v-if="contentImage" :src="task.content" alt="">
    <!-- answers -->
    <div v-if="task.options.all.length > 0 && shuffledTasks && shuffledTasks.length > 0" class="btns">
      <button v-for="(option, idx) in shuffledTasks" :key="idx" @click="selectAnswer(option)">
        {{ option }}
      </button>
    </div>
    <div v-if="imagePath">
      <img :src="imagePath" alt="">
    </div>
    <div v-if="needHelp" :style="{ color }">
      Невірно :(
      <br>
      Спробуйте ще
    </div>
    <div v-if="answerShown" :style="{ color }">
      Вірно!
      <br>
      Наступна локація: {{ task.tip }}
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
    white-space: pre;
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
  }
}
</style>