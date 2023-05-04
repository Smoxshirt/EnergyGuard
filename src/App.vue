

<script>
import { RouterLink, RouterView } from 'vue-router';
import HeaderView from './views/HeaderView.vue';
import EnergyModel from './EnergyModel.js';
import './views/main.css';
import './views/mobile.css';

export default {
  data() {
    return {
      model: {},
    };
  },
  components: {
    HeaderView,
    RouterView,
    EnergyModel,
  },

  created() {
    this.model = new EnergyModel();
  },
};
</script>

<template>
  <HeaderView />
  <RouterView :model="this.model" />
</template>

<style scoped>
/* Add any styles specific to App.vue here */
</style>