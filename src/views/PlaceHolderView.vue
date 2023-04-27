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
        writeUserData("testpath", this.input);
      },
      readFunction(){
        this.readClick = true;
        readUserData("testpath", this.readCallback.bind(this));
      },
      readCallback(snapshot){
        if(this.readClick){
          console.log(snapshot.val().value);
          this.readData = snapshot.val().value;
          this.readClick = false;
        }
      },
      inputChange(e){
        this.input = e.target.value;
      },
      addModelInfo(){
        // writeUserData("devicelist", this.model.devices);
        this.model.addDeviceListToDatabase();
      }
    },
    data(){
      return {
        input: "",
        readData: "",
        readClick: false
      }
    }
  }
</script>

<template>
    <!-- <div>
      Placeholder view. Model access example: <br> {{ this.model.testText }}
    </div>
    <div v-for="device in model.devices">
      {{ device.id }}:
      <span v-for="update in device.consumption">{{ update[0] }} &nbsp;</span>
    </div> -->
    <div>
      <input type="text" @change="inputChange" placeholder="Input to database" />
    </div>
    <div>
      <button @click="testFunction">Write</button>
    </div>
    <div>
      <button @click="readFunction">Read</button>
    </div>
    <div>
      Data from database:&nbsp;{{ this.readData }}
    </div>
</template>