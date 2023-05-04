<script>
    import Chart from 'chart.js';
    export default {
        data(){
            return {
                barChart: [],
                colorArray: ['#c7858f', '#8592c7', '#85c0c7', '#86c785', '#c7af85']
            }
        },
        props: {
            dataArray: Array,
            nameArray: Array
        },
        mounted(){
            this.getGraph();
        },
        beforeUpdate(){
            this.getGraph();
        },
        methods: {
            getGraph(){
                    const chartConfig = {
                        type: 'bar',
                        data: {
                            datasets: [{
                                data: this.dataArray,
                                label: 'Total consumption',
                                backgroundColor: this.colorArray,
                                // borderColor: this.colorArray
                                borderWidth: 1,
                            }],
                            labels: this.nameArray
                        },
                        options: {
                            events: ['click'],
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    }
                    this.barChart = new Chart("barChart", chartConfig);
                    console.log(this.dataArray)
        },
        created(){
            this.readyForGraph = false;
        }
    }}
</script>

<template>
    <div>
        <canvas class="canvas" id="barChart" aria-label="Test3"></canvas>
    </div>
</template>

<style scoped>
    .canvas {
        background-color: lightgrey;
        border-color:black;
        border-width: 10px;
        padding:10px;
        width:flex;
        height:flex;
        max-width:1000px;
        max-height:1000px;
    }
</style>