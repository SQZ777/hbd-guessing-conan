<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  background: var(--color-bg-primary);
}
</style>
