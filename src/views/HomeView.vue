<script>
import DeviceView from './DeviceView.vue';
import ChartView from './ChartView.vue';
import './main.css';

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
    <div>
     <p class="white-text">Welcome!</p>
    </div>

    <div v-if="this.model.isSignedIn">
      <p class="white-text">You are logged in as {{ this.model.emailAddress }}.</p>
    </div>
    <div v-if="!this.model.isSignedIn">
      <p class="white-text">You are not logged in.</p>
    </div>

    <div class="home-view">
      <ChartView />
      <DeviceView />
    </div>
  </main>

  
</template>
