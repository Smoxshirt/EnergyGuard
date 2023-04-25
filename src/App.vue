<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<script>
  import EnergyModel from './EnergyModel.js';
  import './views/main.css';

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
      <div class="dropdown">
        <button class="dropdown-button">
         <div class="dropdown-icon"></div>
         <div class="dropdown-icon"></div>
         <div class="dropdown-icon"></div>
        </button>
        <div class="dropdown-content">
        <h4>
          <RouterLink to="/" class="buttons">Home</RouterLink>
          &nbsp;&nbsp;
          <RouterLink to="/overview" class="buttons">Overview</RouterLink>
          &nbsp;&nbsp;
          <RouterLink to="/placeholder" class="buttons">Placeholder</RouterLink>
          &nbsp;&nbsp;
          <RouterLink to="/login" class="buttons">Login</RouterLink>
          &nbsp;&nbsp;
          <RouterLink to="/devices" class="buttons">Devices</RouterLink>
          

        </h4>

        </div>


      </div>


    </header>

  <RouterView :model=this.model />
</template>

<style scoped>

</style>
