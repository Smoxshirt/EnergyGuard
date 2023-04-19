<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
    <div>
      <nav>
        <RouterLink to="/">Home </RouterLink>
        <RouterLink to="/overview">Overview </RouterLink>
        <RouterLink to="/placeholder">Placeholder </RouterLink>
      </nav>
    </div>

  <RouterView />
</template>

<style scoped>

</style>
