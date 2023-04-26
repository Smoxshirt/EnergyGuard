<<<<<<< HEAD
<<<<<<< Updated upstream
<script setup>

=======
<script>
import DeviceView from './DeviceView.vue'

  export default {
    data(){
      return{

=======
<script>
  export default {
    data(){
      return{

>>>>>>> eec88ab185bdddc9f342562797ca1c8d374d7e5a
      }
    },
    props:{
      model: {},
<<<<<<< HEAD
    },
    components: {
      DeviceView,
    }
  }
>>>>>>> Stashed changes
=======
    }
  }
>>>>>>> eec88ab185bdddc9f342562797ca1c8d374d7e5a
</script>

<template>
  <main>
    <div>
      Welcome!
    </div>
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
=======
>>>>>>> eec88ab185bdddc9f342562797ca1c8d374d7e5a
    <div v-if="this.model.isSignedIn">
      You are logged in as {{ this.model.emailAddress }}.
    </div>
    <div v-if="!this.model.isSignedIn">
      You are not logged in.
    </div>
<<<<<<< HEAD
    <div>
      <DeviceView />
    </div>
>>>>>>> Stashed changes
=======
>>>>>>> eec88ab185bdddc9f342562797ca1c8d374d7e5a
  </main>

  
</template>
