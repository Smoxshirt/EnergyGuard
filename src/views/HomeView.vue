<script>
import DeviceView from './DeviceView.vue';
import ChartView from './ChartView.vue';
import './main.css';
import './mobile.css';

  export default {
    data(){
      return{
        nameArray: Array,
        totalConsumptionArray: Array
      }
    },
    props: ["priceData", "model"],

    computed: {
                  priceTitle() {
                const date=new Date();
                console.log(this.priceData.data[date.getHours()])
                return this.priceData.data[date.getHours()].SEK_per_kWh;
            }
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
            getPrice() {
              this.$emit('getPrice');
            },
    },
    created(){
      this.generateGraphArrays();
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
      :nameArray="this.nameArray"/>
      <DeviceView :model="this.model"/>
    </div>
  </main>

  
</template>
