<script setup>
import { ref, computed } from "vue"
import { useRouter } from '#app'
import useStore from "~/store/index"
import teams from '~/api/data/teamsdata.json'

const router = useRouter()

const state = useStore();

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

const needHelp = ref(false);
const answerShown = ref(false);
const timerInterval = ref(null);

const startTimer = () => {
  state.timerRunning = true;
  state.minutes = 1;
  state.timerDuration = 60;
  state.seconds = 0;
  timerInterval.value = setInterval(() => {
    if (state.timerDuration > 0) {
      state.minutes = Math.floor(state.timerDuration / 60);
      state.seconds = state.timerDuration % 60;
      state.timerDuration--;
    } else {
      stopTimer();
    }
  }, 1000);
}

const stopTimer = () => {
  clearInterval(timerInterval.value);
  state.timerRunning = false;
  state.timerDuration = 60;
  timerInterval.value = null;
  needHelp.value = false;
  state.minutes = 1;
  state.seconds = 0;
}

const selectAnswer = (option) => {
  needHelp.value = false;
  answerShown.value = false;

  if (option !== task.value.correct_answer && !state.timerRunning) {
    needHelp.value = true;
    startTimer();
  } else if (option !== task.value.correct_answer && state.timerRunning) {
    needHelp.value = true;
  } else {
    if (!state.timerRunning) {
      answerShown.value = true
    } else {
      needHelp.value = true;
    }
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

  if (state.timerRunning) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
    needHelp.value = true;
    startTimer();
  }

  nextTick(() => {
    window.onbeforeunload = function() {
      return false;
    }
  })
})

const contentImage = computed(() => {
  return task.value.content.includes('/images/')
})
</script>

<template>
  <div class="wrapper">
    <!-- question -->
    <h1 v-if="!contentImage" :style="{ color }">
      {{ task.content }}
    </h1>
    <img v-if="contentImage" style="width: 95%; object-fit: cover" :src="task.content" alt="">
    <!-- answers -->
    <div v-if="task.options.all && task.options.all.length > 0 && shuffledTasks && shuffledTasks.length > 0" class="btns">
      <button v-for="(option, idx) in shuffledTasks" :key="idx" @click="selectAnswer(option)">
        {{ option }}
      </button>
    </div>
    <div v-if="imagePath">
      <img :src="imagePath" style="width: 95%; object-fit: cover" alt="">
    </div>
    <div v-if="needHelp" :style="{ color }">
      Неправильно :(
      <br>
      Спробуйте ще через {{ state.minutes }}:{{ state.seconds < 10 ? `0${state.seconds}` : state.seconds }}
    </div>
    <div v-if="answerShown" :style="{ color }">
      Правильно!
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

  h1 {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 21px;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-align: center;
    white-space: break-spaces;
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