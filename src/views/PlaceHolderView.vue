<script>
  import { writeUserData, readUserData, testFunction, isLoggedIn, getEmail, readUserDataOnce, setMetaData } from "../firebaseModel.js"
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
        readUserDataOnce("testpath", this.readCallback.bind(this));
      },
      readCallback(snapshot){
          console.log(snapshot.val());
          this.readData = snapshot.val();
      },
      testCallback(snapshot){
        console.log(snapshot.val());
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

        var largeArray4 = new Array(1000);
        for (let i = 0; i < 10000; i++){
          largeArray4[i] = [Math.random() * 50, i];
        }
        this.model.devices[3].consumption = largeArray4;

        var largeArray5 = new Array(1000);
        for (let i = 0; i < 10000; i++){
          largeArray5[i] = [Math.random() * 50, i];
        }
        this.model.devices[4].consumption = largeArray5;

        console.log(this.model.devices);
        
        writeUserData("devicelist", this.model.devices);
      },
      getDevices(){
        readUserData("devicelist", this.updateCallback.bind(this));
      },
      updateCallback(snapshot){
        console.log(snapshot.val());
        this.model.devices = snapshot.val();
      },
      doSomething(){
        const statusObj = [
          {id: 1, name: "Lamp", macAddr: "none", isTurnedOn: false, timer: false, timerEndDate: 0, consumptionIndex: 1, isActive: true},
          {id: 2, name: "Fan", macAddr: "none", isTurnedOn: false, timer: false, timerEndDate: 0, consumptionIndex: 1, isActive: false},
          {id: 3, name: "TV", macAddr: "none", isTurnedOn: false, timer: false, timerEndDate: 0, consumptionIndex: 1, isActive: false},
          {id: 4, name: "Fridge", macAddr: "none", isTurnedOn: false, timer: false, timerEndDate: 0, consumptionIndex: 1, isActive: false},
          {id: 5, name: "Computer", macAddr: "none", isTurnedOn: false, timer: false, timerEndDate: 0, consumptionIndex: 1, isActive: false},
        ];
        const consObj = [
          {id: 1, values: [[25, 5000]]},
          {id: 2, values: [[25, 5000]]},
          {id: 3, values: [[25, 5000]]},
          {id: 4, values: [[25, 5000]]},
          {id: 5, values: [[25, 5000]]},
        ];
        writeUserData("status", statusObj);
        writeUserData("consumption", consObj);
      },
      doSomethingElse(){
        readUserDataOnce("status", this.someCallback.bind(this));
      },
      someCallback(snapshot){
        console.log(snapshot.val());
      },
      setUID(){
        setMetaData(this.hubID);
      },
      hubIdChange(e){
        this.hubID = e.target.value;
      }

    },
    data(){
      return {
        input: "",
        readData: "",
        readClick: false,
        customPath: "",
        hubID: "",
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
      <button class="buttons2" @click="testFunction">Write</button>
    </div>
    <div>
      <button class="buttons2" @click="readFunction">Read</button>
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
        <button class="buttons2" @click="readFunctionB">Read</button>
      </div>
      <div>
        Set turnoff flag
      </div>
      <div>
        <button class="buttons2" @click="turnOff">Turn off</button>
      </div>
      <div>
        <button class="buttons2" @click="turnOn">Turn on</button>
      </div>
      
      <div>
        Add large array
      </div>
      <div>
        <button class="buttons2" @click="addLargeArray">Array</button>
      </div>
      <div>
        Update devices in model from firebase
      </div>
      <div>
        <button class="buttons2" @click="getDevices">Update</button>
      </div>
      <div>
        <button class="buttons2" @click="doSomething">Placeholder</button>
      </div>
      <div>
        <button class="buttons2" @click="doSomethingElse">Read New</button>
      </div>
      <div>
        <input type="text" @change="hubIdChange" placeholder="HUB ID" />
      </div>
      <div>
        <button class="buttons2" @click="setUID">Set UID</button>
      </div>
    </div>

    
    
</template>