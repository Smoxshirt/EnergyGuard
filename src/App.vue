

<script>
import { observeAuth } from "./firebaseModel.js";
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
    this.model.updateUserStatus();
    observeAuth(this.authCallback.bind(this));
  },

  methods: {
    authCallback(user){
      this.model.waitingForUserData = false;
      if(user){
            this.model.isSignedIn = true;
            this.model.emailAddress = user.email;
            console.log("Callback FROM APP with logged in user")
        }else{
            this.model.isSignedIn = false;
            this.model.emailAddress = "";
            console.log("Callback FROM APP WITHOUT logged in user")
        }
    }
  }
};
</script>

<template>
  <HeaderView />
  <RouterView :model="this.model" />
</template>

<style scoped>
/* Add any styles specific to App.vue here */
</style>