<script>
    import LineChartView from '../views/LineChartView.vue';
    import PieChartView from '../views/PieChartView.vue';
    import BarChartView from '../views/BarChartView.vue';
    export default {
        data(){
            return{
              //  startTime: 10002,
              //  endTime: 10007,
           //     startTime: this.toFormattedDate(10002),
           //     endTime: this.toFormattedDate(10007),
                startTime: 10002 * 24 * 60 * 60 * 1000,
                endTime: 10007 * 24 * 60 * 60 * 1000,
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
            toFormattedDate(dayNumber) {
                const date = new Date(dayNumber * 24 * 60 * 60 * 1000);
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, "0");
                const day = date.getDate().toString().padStart(2, "0");
                
                return `${year}-${month}-${day}`;
            },
            toFormattedDate2(timestamp) {
                const date = new Date(timestamp);
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                
                return `${year}-${month}-${day} ${hours}:${minutes}`;                
            },
            setperiodCheck(update){
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
                //this.startTime = e.target.value;
                const date = new Date(e.target.value);
               // this.startTime = Math.floor(date.getTime() / (24 * 60 * 60 * 1000));
                this.startTime = date.getTime();
                console.log(this.startTime);
            },
            updateEndTime(e){
                //this.endTime = e.target.value;
                const date = new Date(e.target.value);
                //this.endTime = Math.floor(date.getTime() / (24 * 60 * 60 * 1000));
                this.endTime = date.getTime();
                console.log(this.endTime);
            },
            generateGraphArrays(){
                /* this.graphData = new Array(this.model.devices[0].periodConsumption.length);
                this.graphLabels = new Array(this.model.devices[0].periodConsumption.length);
                for (let i = 0; i < this.model.devices[0].periodConsumption.length; i++){
                    this.graphData[i] = this.model.devices[0].periodConsumption[i][0];
                    this.graphLabels[i] = this.model.devices[0].periodConsumption[i][1];
                } */
                if(this.model.hasDevices === false){
                    return;
                }
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
    <div class="welcome-container" v-if="!this.model.isSignedIn">
      <div>
     <p class="p-welcome">Welcome!</p>
    </div>
    <div>
      <div v-if="!this.model.isSignedIn">
        <p class="p-welcome">You are not logged in.</p>
      </div>
    </div>
    </div>

    <div class="general-container" v-if="this.model.isSignedIn">
    <h1 class="nomargin-nopadding">Consumption overview</h1> 
    <h4>Please enter start and end date for the period</h4>
    <div>
       <p>From</p> <input type="datetime-local" @change="updateStartTime" placeholder="Start" />
    </div>
    <div>
       <p>To</p> <input type="datetime-local" @change="updateEndTime" placeholder="End" />
    </div>
    <div>
        <button class="buttons2" @click="setPeriod">Set period</button>
    </div>
    <br>
    <div>
        <button class="buttons2" @click="setLine">Line</button> <button class="buttons2" @click="setBar">Bar</button> <button class="buttons2" @click="setPie">Pie</button>
    </div>

    <div class="chart-container">
    <div v-if="this.model.hasDevices" class="charts">
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
    </div>


    <div class="consumption-overview-stats">
            <h4 class="nomargin-nopadding">Consumption</h4> 
            <h4 class="nomargin-nopadding">overview</h4> 
            <h4 class="nomargin-nopadding-up">between </h4> 
            <h4 class="nomargin-nopadding">{{ toFormattedDate2(this.model.startTime) }}</h4>
            <h4 class="nomargin-nopadding">and</h4>
            <h4 class="nomargin-nopadding-up">{{ toFormattedDate2(this.model.endTime) }}</h4>
            <div v-for="device in this.model.devices">
                 {{ device.name }}:&nbsp;{{ device.periodTotal }}
            </div>
        </div>
    </div>
</div>

</template>