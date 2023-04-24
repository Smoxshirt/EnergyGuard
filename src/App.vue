<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<script>
  import EnergyModel from './EnergyModel.js'

  export default {
    data(){
      return {
        model: {}
      }
    },

    created(){
      this.model = new EnergyModel();
    }

  }

</script>

<template>
    <header>

        <h4>
          <RouterLink to="/">Home</RouterLink>
          &nbsp;&nbsp;
          <RouterLink to="/overview">Overview</RouterLink>
          &nbsp;&nbsp;
          <RouterLink to="/placeholder">Placeholder</RouterLink>
          &nbsp;&nbsp;
          <RouterLink to="/login">Login</RouterLink>
        </h4>

    </header>

  <RouterView :model=this.model />
</template>

<style scoped>

</style>
