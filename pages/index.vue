<template>
  <div class="wrapper">
    <img :src="mechMatLogo" alt="logo" class="logo">
    <h1>MECH MAT QUEST</h1>
  </div>
</template>

<script setup>
import mechMatLogo from '~/static/images/mechmatlogo.png'
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  .logo {
    width: 100%;
    height: 50%;
    object-fit: contain;
    max-width: 250px;
  }
}
</style>