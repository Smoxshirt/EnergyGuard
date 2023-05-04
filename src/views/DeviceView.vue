<script>
import './DeviceView.css';
import './main.css';
import './mobile.css';
import TimerView from './TimerView.vue';
export default {
  methods: {
    toggleActive(device) {
      device.isTurnedOn = !device.isTurnedOn;
    },
    toggleExpand(device) {
        device.expanded = !device.expanded;
    }
  },
  props: {
    model: {}
  },
  components: {
    TimerView,
  },
  created(){
    console.log(this.model)
  },
  data() {
    return {
        devices: [
            {
                id: 1, 
                name: 'DeviceName 1', //user chooses name on web app, default to device "id"?
                status: 'DeviceStatus', //unsure what to have here...
                isActive: false, 
                expanded: false 
            },
            {
                id: 2, 
                name: 'DeviceName 2', 
                status: 'DeviceStatus', 
                isActive: false, 
                expanded: false 
            },
            {
                id: 3, 
                name: 'DeviceName 3', 
                status: 'DeviceStatus', 
                isActive: false, 
                expanded: false 
            },
            {
                id: 4, 
                name: 'DeviceName 4', 
                status: 'DeviceStatus', 
                isActive: false, 
                expanded: false 
            },
            {
                id: 5, 
                name: 'DeviceName 5', 
                status: 'DeviceStatus', 
                isActive: false, 
                expanded: false 
            }
        ],
    };
  },
};
</script>

<template>
    <div class="devices-container">
        <div class="device" v-for="device in this.model.devices" :key="device.id" :class="{expanded: device.expanded}">
            <div class="device-top">
                <div class="device-content">
                    <h3>{{ device.name }}</h3>
                    <p>Status: Timerstatus {{ device.status }}</p>
                    </div>
                    <button class="on-off-button" :class="[device.isTurnedOn ? 'green' : 'red']" @click="toggleActive(device)">{{ device.isTurnedOn ? 'ON' : 'OFF' }}</button>
                    <button class="expand-button" @click="toggleExpand(device)">
                        <span class="arrow-down" v-if="!device.expanded"></span>
                        <span class="arrow-up" v-else></span>
                    </button>
                </div>  
            <div class="details" v-if="device.expanded">  
                <TimerView :device="device" />
            </div>
        </div>
    </div>
</template>