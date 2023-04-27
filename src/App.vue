<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HeaderView from './views/HeaderView.vue';
</script>

<script>
import EnergyModel from './EnergyModel.js';
import './views/main.css';

export default {
  data() {
    return {
      model: {},
    };
  },

  created() {
    this.model = new EnergyModel();
  },
};
</script>

<template>
    <div>
      <nav>
        <RouterLink to="/">Home </RouterLink>
        <RouterLink to="/overview">Overview </RouterLink>
        <RouterLink to="/placeholder">Placeholder </RouterLink>
        <RouterLink to="/devices">Devices</RouterLink>
      </nav>
    </div>

  <RouterView />
</template>

<style scoped>
/* Add any styles specific to App.vue here */
</style>
