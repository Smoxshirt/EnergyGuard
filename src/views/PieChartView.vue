<script>
    import Chart from 'chart.js';
    export default {
        data(){
            return {
                pieChart: [],
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
                        type: 'pie',
                        data: {
                            datasets: [{
                                data: this.dataArray,
                                label: 'Test2',
                                backgroundColor: this.colorArray,
                                // borderColor: this.colorArray
                                borderWidth: 1,
                            }],
                            labels: this.nameArray
                        },
                        options: {
                            events: ['click']
                        }
                    }
                    this.pieChart = new Chart("pieChart", chartConfig);
        },
        created(){
            this.readyForGraph = false;
        }
    }}
</script>

<template>
    <div>
        <canvas class="canvas" id="pieChart" aria-label="Test2"></canvas>
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