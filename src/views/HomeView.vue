<script>
  export default {
    data(){
      return{

      }
    },
    props:{
      model: {},
    }
  }
</script>

<template>
  <main>
    <div>
      Welcome!
    </div>
    <div v-if="this.model.isSignedIn">
      You are logged in as {{ this.model.emailAddress }}.
    </div>
    <div v-if="!this.model.isSignedIn">
      You are not logged in.
    </div>
  </main>

  
</template>
