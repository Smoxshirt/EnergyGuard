<script>
import DeviceView from './DeviceView.vue';
import ChartView from './ChartView.vue';
import './main.css';
import './mobile.css';

  export default {
    data(){
      return{
      }
    },
    props:{
      model: {},

    },
    components: {
      ChartView,
      DeviceView,
    },
  };
</script>

<template>
  <main>
    <div class="general-container">
      <div>
     <p>Welcome!</p>
    </div>

    <div v-if="this.model.isSignedIn">
      <p>You are logged in as {{ this.model.emailAddress }}.</p>
    </div>
    <div v-if="!this.model.isSignedIn">
      <p>You are not logged in.</p>
    </div>
    </div>


    <div class="home-view">
      <ChartView />
      <DeviceView :model="this.model"/>
    </div>
  </main>

  
</template>
