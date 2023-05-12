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
            holder: Array
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
    <div>
        <canvas class="canvas" id="lineChart" aria-label="Test"></canvas>
    </div>
    <div style="font-size: 1px">
        {{ this.holder[0][0] }}
    </div>
</template>