<script>
    import LineChartView from '../views/LineChartView.vue';
    import PieChartView from '../views/PieChartView.vue';
    import BarChartView from '../views/BarChartView.vue';
    export default {
        data(){
            return{
                startTime: 10002,
                endTime: 10007,
                periodConsumption: [],
                graphData: [],
                graphLabels: [],
                graphArray: [],
                nameArray: [],
                totalConsumptionArray: [],
                displayLine: true,
                displayBar: false,
                displayPie: false
            }
        },
        components: {
            LineChartView,
            PieChartView,
            BarChartView
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
                // this.generateGraphArrays();
            },
            updateStartTime(e){
                this.startTime = e.target.value;
            },
            updateEndTime(e){
                this.endTime = e.target.value;
            },
            generateGraphArrays(){
                /* this.graphData = new Array(this.model.devices[0].periodConsumption.length);
                this.graphLabels = new Array(this.model.devices[0].periodConsumption.length);
                for (let i = 0; i < this.model.devices[0].periodConsumption.length; i++){
                    this.graphData[i] = this.model.devices[0].periodConsumption[i][0];
                    this.graphLabels[i] = this.model.devices[0].periodConsumption[i][1];
                } */
                this.graphArray = new Array(this.model.devices.length);
                this.nameArray = new Array(this.model.devices.length);
                this.totalConsumptionArray = new Array(this.model.devices.length);
                for (let i = 0; i < this.model.devices.length; i++){
                    this.graphArray[i] = this.model.devices[i].graphData;
                    this.nameArray[i] = this.model.devices[i].name;
                    this.totalConsumptionArray[i] = this.model.devices[i].periodTotal;
                }
            },
            setLine(){
                this.displayLine = true;
                this.displayBar = false;
                this.displayPie = false;
            },
            setBar(){
                this.displayLine = false;
                this.displayBar = true;
                this.displayPie = false;
            },
            setPie(){
                this.displayLine = false;
                this.displayBar = false;
                this.displayPie = true;
            }
        },
        beforeUpdate(){
            this.generateGraphArrays();
        },
        created(){
            this.generateGraphArrays();
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
    <br>
    <div>
        <button @click="setLine">Line</button> <button @click="setBar">Bar</button> <button @click="setPie">Pie</button>
    </div>
    <h4>Consumption overview between {{ this.model.startTime }} and {{ this.model.endTime }}</h4>
    <div v-for="device in this.model.devices">
        Total energy consumption for {{ device.name }}:&nbsp;{{ device.periodTotal }}
    </div>
    <LineChartView v-if="this.displayLine"
    :dataArray="this.graphArray" 
    :labelArray="this.model.devices[0].graphLabels"
    :nameArray="this.nameArray" />


    <PieChartView v-if="this.displayPie"
    :dataArray="this.totalConsumptionArray"
    :nameArray="this.nameArray" />

    <BarChartView v-if="this.displayBar"
    :dataArray="this.totalConsumptionArray"
    :nameArray="this.nameArray" />

</template>