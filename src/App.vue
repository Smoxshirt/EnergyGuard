

<script>
import { observeAuth, readUserData } from "./firebaseModel.js";
import { RouterLink, RouterView } from 'vue-router';
import HeaderView from './views/HeaderView.vue';
import EnergyModel from './EnergyModel.js';
import './views/main.css';
import './views/mobile.css';

export default {
  data() {
    return {
      model: {},
      initialCallback: false,
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
    this.initialCallback = true;
    observeAuth(this.authCallback.bind(this));
  },

  methods: {
    authCallback(user){
      this.model.waitingForUserData = false;
      if(user){
            this.model.isSignedIn = true;
            this.model.emailAddress = user.email;
            console.log("Callback FROM APP with logged in user")
            if(this.initialCallback){
              readUserData("consumption", this.consumptionCallback.bind(this));
              readUserData("status", this.statusCallback.bind(this));
              this.initialCallback = false;
            }
        }else{
            this.model.isSignedIn = false;
            this.model.emailAddress = "";
            console.log("Callback FROM APP WITHOUT logged in user")
        }
    },

    consumptionCallback(snapshot){
      console.log(snapshot.val().value);
      this.model.updateDeviceConsumption(snapshot.val().value);
    },

    statusCallback(snapshot){
      console.log(snapshot.val().value);
      this.model.updateDeviceStatus(snapshot.val().value)
    }
  }
};
</script>

<template>
  <HeaderView :model="this.model" />
  <RouterView :model="this.model" />
</template>

<style scoped>
/* Add any styles specific to App.vue here */
</style>