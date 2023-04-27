<script>
  import { writeUserData, readUserData } from "../firebaseModel.js"
  export default {
    props: {
      model: {
        type: Object,
        default: {testText: "hej"}
      }
    },
    methods: {
      testFunction(){
        writeUserData("testpath", 405);
      },
      readFunction(){
        readUserData("testpath", this.readCallback.bind(this));
      },
      readCallback(snapshot){
        console.log(snapshot.val());
      }
    }
  }
</script>

<template>
    <div>
      Placeholder view. Model access example: <br> {{ this.model.testText }}
    </div>
    <div v-for="device in model.devices">
      {{ device.id }}:
      <span v-for="update in device.consumption">{{ update[0] }} &nbsp;</span>
    </div>
    <div>
      <button @click="testFunction">Write</button>
    </div>
    <div>
      <button @click="readFunction">Read</button>
    </div>
</template>