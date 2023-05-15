<script>
import './DeviceView.css';
import './main.css';
import './mobile.css';
import TimerView from './TimerView.vue';
import LimitView from './LimitView.vue';
import { writeUserData, readUserData, setUserData } from "../firebaseModel.js"
export default {
  methods: {
    toggleActive(device) {
      device.isTurnedOn = !device.isTurnedOn;
      var path = "status/" + device.index + "/isTurnedOn";
      console.log(path);
      setUserData(path, device.isTurnedOn);
    },
    toggleExpand(device) {
        device.expanded = !device.expanded;
    },
    setTimer(timestamp, index, intIndex){
      this.model.devices[intIndex].timerEndDate = timestamp;
      this.model.devices[intIndex].timer = true;
      var pathA = "status/" + index + "/timerEndDate";
      var pathB = "status/" + index + "/timer";
      setUserData(pathA, timestamp);
      setUserData(pathB, true);
    },
    cancelTimer(index, intIndex){
      this.model.devices[intIndex].timerEndDate = 0;
      this.model.devices[intIndex].timer = false;
      var pathA = "status/" + index + "/timerEndDate";
      var pathB = "status/" + index + "/timer";
      setUserData(pathB, false);
      setUserData(pathA, 0);
    },
    startTimerCountdown(){
      this.model.activateTimerCountdown();
    },

    endTimerCountdown(){
      this.model.cancelTimer();
    }
  },
  props: {
    model: {}
  },
  components: {
    TimerView,
    LimitView,
  },
  created(){
    console.log(this.model)
  },
  data() {
    return {

    };
  },
  mounted(){
    this.startTimerCountdown();
  },
  unmounted(){
    this.endTimerCountdown();
  },
  updated(){
    this.endTimerCountdown();
    this.startTimerCountdown();
  }
};
</script>

<template>
    <div class="devices-container">
        <div class="device" v-for="device in this.model.devices" :key="device.id" :class="{expanded: device.expanded}">
            <div class="device-top">
                <div class="device-content">
                    <h3>{{ device.name }}</h3>
                    <div v-if="device.timer">
                      <p style="font-size: 12px">Timer: {{ device.timerCountdown }}</p>
                    </div>
                    
                    </div>
                    <button class="on-off-button" :class="[device.isTurnedOn ? 'green' : 'red']" @click="toggleActive(device)">{{ device.isTurnedOn ? 'ON' : 'OFF' }}</button>
                    <button class="expand-button" @click="toggleExpand(device)">
                        <span class="arrow-down" v-if="!device.expanded"></span>
                        <span class="arrow-up" v-else></span>
                    </button>
                </div>  
            <div class="details" v-if="device.expanded">  
                <TimerView :device="device" @set-timer="setTimer" @cancel-timer="cancelTimer" />
                <LimitView :device="device" />
            </div>
        </div>
    </div>
</template>