

<script>
import { observeAuth, readUserData, readUserDataOnce } from "./firebaseModel.js";
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
            /* if(this.initialCallback){
              readUserDataOnce("consumption", this.consumptionCallback.bind(this));
              readUserDataOnce("status", this.statusCallback.bind(this));
              this.initialCallback = false;
            } */
            readUserDataOnce("consumption", this.consumptionCallback.bind(this));
            readUserDataOnce("status", this.statusCallback.bind(this));
        }else{
            this.model.isSignedIn = false;
            this.model.hasDevices = false;
            this.model.emailAddress = "";
            console.log("Callback FROM APP WITHOUT logged in user")
        }
    },

    consumptionCallback(snapshot){
      console.log(snapshot.val());
      this.model.updateDeviceConsumption(snapshot.val());
    },

    statusCallback(snapshot){
      console.log(snapshot.val());
      this.model.updateDeviceStatus(snapshot.val())
    }
  }
};
</script>

<template>
  <HeaderView :model="this.model" />
  <RouterView :model="this.model" />
</template>

<style scoped>

</style>