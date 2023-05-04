<script>
import './main.css';
import './mobile.css';

export default {
    name: 'TimerView',
    props: {
        device: Object,
    },
    data() {
        return {
            currentDateTime: this.getCurrentDateTime(),
        };
    },
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
            console.log(new Date().getTime());
        },
        setTimer() {
            console.log(new Date().getTime());
        },
    },
};
</script>

<template>
    <div class="timer-view">
        <div class="timer-content">
            <h4>Set date and time for turning on/off</h4>
            <input type="datetime-local" v-model="currentDateTime" />
            <button class="timer-button" @click="setScheduledTimer()">Set timer</button>
        </div>
        <div class="timer-content">
            <h4>Set time until turning on/off</h4>
            <input class="choose-timer" type="number" min="0" placeholder="Hours" v-model="hours" />
            <input class="choose-timer" type="number" min="0" placeholder="Minutes" v-model="minutes" />
            <input class="choose-timer" type="number" min="0" placeholder="Seconds" v-model="seconds" />
            <button class="timer-button" @click="setTimer()">Set timer</button>
        </div>
    </div>
</template>