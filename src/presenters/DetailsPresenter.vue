<script>
    export default {
        data(){
            return{
                startTime: 10002,
                endTime: 10007,
                periodConsumption: []
            }
        },
        props: {
            model: Object
        },
        methods: {
            periodCheck(update){
                    return (update[1] === this.startTime || (update[1] > this.startTime && update[1] < this.endTime) || update[1] === this.endTime);
                },
            consumptionDuringTimePeriod(){
                for (let i = 0; i < this.model.devices.length; i++){
                    console.log(this.model.devices[i].id)
                    this.model.devices[i].periodConsumption = [... this.model.devices[i].consumption.filter(this.periodCheck)];
                }
                console.log(this.model.devices[0].periodConsumption)
                console.log(this.model.devices[1].periodConsumption)
                console.log(this.model.devices[2].periodConsumption)
            },
            setPeriod(){
                this.model.setPeriod(this.startTime, this.endTime);
                this.model.updatePeriodConsumption();
            },
            updateStartTime(e){
                this.startTime = e.target.value;
            },
            updateEndTime(e){
                this.endTime = e.target.value;
            }
        }
    }
</script>

<template>
    <h4>Please enter start and end date for the period</h4>
    <div>
        <input @change="updateStartTime" placeholder="Start" />
    </div>
    <div>
        <input @change="updateEndTime" placeholder="End" />
    </div>
    <div>
        <button @click="setPeriod">Set period</button>
    </div>
    <h4>Consumption overview between {{ this.model.startTime }} and {{ this.model.endTime }}</h4>
    <div v-for="device in this.model.devices">
        Total energy consumption for {{ device.name }}:&nbsp;{{ device.periodTotal }}
    </div>
</template>