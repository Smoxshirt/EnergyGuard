<script>
  import { writeUserData, readUserData } from "../firebaseModel.js"
  import './main.css';
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
      testCallback(snapshot){
        console.log(snapshot.val().value);
      },
      testCallbackB(snapshot){
        console.log(snapshot.val());
      },
      inputChange(e){
        this.input = e.target.value;
      },
      addModelInfo(){
        // writeUserData("devicelist", this.model.devices);
        this.model.addDeviceListToDatabase();
      },
      customChange(e){
        this.customPath = e.target.value;
      },
      readFunctionB(){
        readUserData(this.customPath, this.testCallbackB);
      },
      turnOff(){
        writeUserData("testflags", 0);
      },
      turnOn(){
        writeUserData("testflags", 1);
      },
      addLargeArray(){
        var largeArray = new Array(1000);
        for (let i = 0; i < 10000; i++){
          largeArray[i] = [Math.random() * 50, i];
        }
        this.model.devices[0].consumption = largeArray;

        var largeArray2 = new Array(1000);
        for (let i = 0; i < 10000; i++){
          largeArray2[i] = [Math.random() * 50, i];
        }
        this.model.devices[1].consumption = largeArray2;

        var largeArray3 = new Array(1000);
        for (let i = 0; i < 10000; i++){
          largeArray3[i] = [Math.random() * 50, i];
        }
        this.model.devices[2].consumption = largeArray3;
        
        writeUserData("devicelist", this.model.devices);
      },
      getDevices(){
        readUserData("devicelist", this.updateCallback.bind(this));
      },
      updateCallback(snapshot){
        console.log(snapshot.val());
        this.model.devices = snapshot.val().value;
      }
    },
    data(){
      return {
        input: "",
        readData: "",
        readClick: false,
        customPath: ""
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
    
    <div class="general-container">
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
      <div>
        Add data to custom path
      </div>
      <div>
        <input type="text" @change="customChange" placeholder="Path" />
      </div>
      <div>
        <button @click="readFunctionB">Read</button>
      </div>
      <div>
        Set turnoff flag
      </div>
      <div>
        <button @click="turnOff">Turn off</button>
      </div>
      <div>
        <button @click="turnOn">Turn on</button>
      </div>
      
      <div>
        Add large array
      </div>
      <div>
        <button @click="addLargeArray">Array</button>
      </div>
      <div>
        Update devices in model from firebase
      </div>
      <div>
        <button @click="getDevices">Update</button>
      </div>
    </div>
    
    
</template>