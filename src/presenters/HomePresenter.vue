<script>
import DeviceView from '../views/DeviceView.vue';
import ChartView from '../views/ChartView.vue';
import { getCurrentPrice } from '../priceSource';
import { resolvePromise } from '../resolvePromise';
import '../views/main.css';
import '../views/mobile.css';

  export default {
    data(){
      return{
        nameArray: Array,
        totalConsumptionArray: Array
      }
    },
    props: ["priceData", "model"],

    computed: {
            priceData(){
                if (this.model.pricePromiseState.data == null) {
                    this.model.pricePromiseState.data = { price: "Waiting for a price..." };
                }
                return this.model.pricePromiseState;
            },
    },
    components: {
      ChartView,
      DeviceView,
    },
    methods: {
      generateGraphArrays(){
        if(this.model.hasDevices === false){
                  return;
                }
                this.nameArray = new Array(this.model.devices.length);
                this.totalConsumptionArray = new Array(this.model.devices.length);
                for (let i = 0; i < this.model.devices.length; i++){
                    this.nameArray[i] = this.model.devices[i].name;
                    this.totalConsumptionArray[i] = this.model.devices[i].periodTotal;
                }
            },
            getPrice(){
                this.model.getCurrentEnergyPrice();
            }
    },
    created(){
      this.generateGraphArrays();
      if (this.model.pricePromiseState.promise == undefined)
                resolvePromise(getCurrentPrice(), this.model.pricePromiseState);
    },
    beforeUpdate(){
      this.generateGraphArrays();
    },
    updated(){
      
    }
  };
</script>

<template>
  <main>
    <div class="welcome-container">
      <div>
     <p class="p-welcome">Welcome!</p>
    </div>
    <div v-if="this.model.waitingForUserData">
      <p class="p-welcome">Waiting for user data...</p>
    </div>
    <div v-if="!this.model.waitingForUserData">
      <div v-if="this.model.isSignedIn">
        <p class="p-welcome">You are logged in as {{ this.model.emailAddress }}.</p>
      </div>
      <div v-if="!this.model.isSignedIn">
        <p class="p-welcome">You are not logged in.</p>
      </div>
    </div>
    </div>


    <div class="welcome-container" v-if="!this.model.hasDevices && !this.model.waitingForUserData && this.model.isSignedIn">
      <p class="p-welcome">No devices connected to the hub. Connect a device to display here.</p>
    </div>
    <div class="home-view" v-if="this.model.isSignedIn && this.model.hasDevices">
      <ChartView 
      :dataArray="this.totalConsumptionArray"
      :nameArray="this.nameArray"
      :priceData="priceData"
      @getPrice="getPrice"/>
      <DeviceView :model="this.model"/>
    </div>
  </main>

  
</template>
