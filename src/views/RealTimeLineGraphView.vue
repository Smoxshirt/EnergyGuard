<script>
    import Chart from 'chart.js';
    import './main.css';
    import './mobile.css';
    export default {
        data(){
            return {
                lineChart: [],
                readyForGraph: false
            }
        },
        props: {
            labelArray: Array,
            dataArray: Array,
            name: '',
            holder: Array,
            isSignedIn: Boolean
        },
        mounted(){
            this.getGraph();
        },
        unmounted(){
            console.log("Unmounted");
        },
        beforeUpdate(){
            this.getGraph();
        },
        methods: {
            getGraph(){
                    for (let i = 0; i < this.labelArray.length; i++){
                        var dateObj = new Date(this.labelArray[i]);
                        var dateString = dateObj.getFullYear() + "/" + 
                        (dateObj.getMonth() + 1) + "/" + 
                        dateObj.getDate() + " " + 
                        dateObj.getHours() + ":" + 
                        dateObj.getMinutes() + ":" + 
                        dateObj.getSeconds();
                        this.labelArray[i] = dateString;
                    }
                    const chartConfig = {
                        type: 'line',
                        data: {
                            datasets: [
                                {
                                    label: this.name,
                                    data: this.dataArray,
                                    backgroundColor: '#c7af85',
                                    borderColor: '#c7af85',
                                    fill: false,
                                    borderWidth: 5
                                }
                            ],
                            labels: this.labelArray
                        },
                        options: {
                            events: ['click'],
                            animation: {
                                duration: 0
                            },
                            scales: {
                                yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'mWs',
                                },
                                ticks: {
                                    suggestedMin: 0,
                                    suggestedMax: 50
                                }
                                }],
                                xAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time'
                                }
                                }]
                            } 
                        }
                    }
                    this.lineChart = new Chart("lineChart", chartConfig);
                    this.readyForGraph = true;
        },
        created(){
            this.readyForGraph = false;
        }
    }}
</script>

<template>
    <div class="welcome-container" v-if="!this.isSignedIn">
      <div>
     <p class="p-welcome">Welcome!</p>
    </div>
    <div>
      <div v-if="!this.isSignedIn">
        <p class="p-welcome">You are not logged in.</p>
      </div>
    </div>
    </div>
    
    <div class="general-container" v-if="this.isSignedIn">
  <div class="realtime-energy">
        <h1 class="nomargin-nopadding">Realtime Energy Consumpton</h1> 
        <canvas class="canvas" id="lineChart" aria-label="Test"></canvas>
    </div>
    <div style="font-size: 1px">
        {{ this.holder[0][0] }}
    </div>
    </div>
  
</template>