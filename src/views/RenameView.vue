<script>
import './main.css';
import './mobile.css';
import { writeUserData, readUserData } from "../firebaseModel.js"

export default {
    name: 'RenameView',
    props: {
        device: Object,
    },
    data() {
        return {
            name: "",
        };
    },
    methods: {
        setName() {
            this.device.name = this.name;
            var path = "status/" + (this.device.id - 1) + "/name";
            console.log(path);
            writeUserData(path, this.name);
        },
        updateName(e){
            this.name = e.target.value;
        }
    },
};
</script>

<template>
    <div class="limit-view">
        <div class="limit-content">
            <h4>Change device name</h4>
            <input placerholder="New name" @change="updateName" />
            <button class="timer-button" @click="setName">Change</button>
        </div>
    </div>
</template>