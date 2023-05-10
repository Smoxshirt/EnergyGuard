<script>
import './main.css';
import './mobile.css';
import { writeUserData, readUserData } from "../firebaseModel.js"

export default {
    name: 'LimitView',
    props: {
        device: Object,
    },
    data() {
        return {
            limit: 0,
        };
    },
    methods: {
        setLimit() {
            const limit = this.limit;
            if(limit < 0) {
                console.log("Can not set negative limit");
            }
            else {
                console.log(limit);

                var path = "devicelist/value/" + (this.device.id - 1) + "/limit";
                console.log(path);
                writeUserData(path, limit);
            }
        },
    },
};
</script>

<template>
    <div class="limit-view">
        <div class="limit-content">
            <h4>Set powerlimit</h4>
            <input type="number" min="0" placerholder="Set powerlimit" v-model="limit" />
            <button class="timer-button" @click="setLimit()">Set limit</button>
        </div>
    </div>
</template>