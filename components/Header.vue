<template>
  <header class="wrapper" :style="{ background }">
    <img src="/images/mechmatlogo.png" alt="logo" class="logo">
    <h1 :style="{ color }">MECH-MAT QUEST</h1>
  </header>
</template>

<script setup>
const props = defineProps(['background', 'color'])
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    gap: 30px;
  }

  h1 {
    font-size: 16px;
  }

  .logo {
    height: 90%;
    width: 100%;
    object-fit: contain;
    max-width: 200px;
  }
}
</style>