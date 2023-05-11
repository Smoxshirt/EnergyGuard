<script>
import './main.css';
import './mobile.css';
import { writeUserData, readUserData } from "../firebaseModel.js"

export default {
    name: 'TimerView',
    props: {
        device: Object,
    },
    data() {
        return {
            currentDateTime: this.getCurrentDateTime(),
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    },
    emits:['set-timer'],
    methods: {
        getCurrentDateTime() {
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            
            console.log(now.getTime());

            return `${year}-${month}-${day}T${hours}:${minutes}`;
        },
        getCurrentDateTimeTwo() {
            const nowTwo = new Date();
            return nowTwo;
        },
        setScheduledTimer() {
            const selectedDateTime = new Date(this.currentDateTime);
            const timestamp = selectedDateTime.getTime();
            if(timestamp < new Date()) {
                console.log("can not set timer earlier than current date");
            }
            else {
                console.log("scheduled time " + timestamp);

                var path = "devicelist/value/" + (this.device.id - 1) + "/timer";
                console.log(path);
                writeUserData(path, timestamp);
            }
            this.$emit('set-timer', timestamp, this.device.index, this.device.intIndex);
        },
        setTimer() {
            console.log("current time " + new Date().getTime())
            const currentTime = new Date();
            const targetTime = new Date(
                currentTime.getTime() + 
                this.hours * 60 * 60 * 1000 + 
                this.minutes * 60 * 1000 + 
                this.seconds * 1000
            );
            const timestamp = targetTime.getTime();
            if(timestamp < new Date()) {
                console.log("can not set timer earlier than current date");
            }
            else {
                console.log("current time + timer " + timestamp);

                var path = "devicelist/value/" + (this.device.id - 1) + "/timer";
                console.log(path);
                writeUserData(path, timestamp);
            }
            this.$emit('set-timer', timestamp, this.device.index, this.device.intIndex);
        },
    },
};
</script>

<template>
    <div class="timer-view">
        <div class="timer-content">
            <h4>Set date and time for turning off</h4>
            <input type="datetime-local" v-model="currentDateTime" />
            <button class="timer-button" @click="setScheduledTimer()">Set timer</button>
        </div>
        <div class="timer-content">
            <h4>Set time until turning off</h4>
            <p>hours, minutes, seconds</p>
            <input class="choose-timer" type="number" min="0" placeholder="Hours" v-model="hours" />
            <input class="choose-timer" type="number" min="0" placeholder="Minutes" v-model="minutes" />
            <input class="choose-timer" type="number" min="0" placeholder="Seconds" v-model="seconds" />
            <button class="timer-button" @click="setTimer()">Set timer</button>
        </div>
    </div>
</template>