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
    props:{
      model: {},

    },
    components: {
      ChartView,
      DeviceView,
    },
    methods: {
      generateGraphArrays(){
                this.nameArray = new Array(this.model.devices.length);
                this.totalConsumptionArray = new Array(this.model.devices.length);
                for (let i = 0; i < this.model.devices.length; i++){
                    this.nameArray[i] = this.model.devices[i].name;
                    this.totalConsumptionArray[i] = this.model.devices[i].periodTotal;
                }
            }
    },
    created(){
      this.generateGraphArrays();
    }
  };
</script>

<template>
  <main>
    <div class="welcome-container">
      <div>
     <p class="p-welcome">Welcome!</p>
    </div>

    <div v-if="this.model.isSignedIn">
      <p class="p-welcome">You are logged in as {{ this.model.emailAddress }}.</p>
    </div>
    <div v-if="!this.model.isSignedIn">
      <p class="p-welcome">You are not logged in.</p>
    </div>
    </div>


    <div class="home-view">
      <ChartView 
      :dataArray="this.totalConsumptionArray"
      :nameArray="this.nameArray"/>
      <DeviceView :model="this.model"/>
    </div>
  </main>

  
</template>
