<script>
    import Chart from 'chart.js';
    export default {
        data(){
            return {
                myChart: [],
                chartReady: false
            }
        },
        methods: {
            updateGraph(){
            console.log("Updated");
            const newList = [
                {x:22, y:7},
                {x:80, y:8},
                {x:70, y:8},
                {x:40, y:9},
                {x:90, y:9},
                {x:100, y:9},
                {x:22, y:10},
                {x:120, y:11},
                {x:10, y:14},
                {x:140, y:14},
                {x:150, y:15}
            ];
            this.myChart = new Chart("myChart", {
            type: "scatter",
            data: {
                datasets: [{
                pointRadius: 4,
                pointBackgroundColor: "rgba(0,0,255,1)",
                data: newList,
                backgroundColor: "White"
                }]
            },
            options: {}
            });
        }
        },
        created(){

        },
        mounted(){
            // const ctx = document.getElementById('myChart');
            const dataList = [
                {x:50, y:7},
                {x:60, y:8},
                {x:70, y:8},
                {x:80, y:9},
                {x:90, y:9},
                {x:100, y:9},
                {x:110, y:10},
                {x:120, y:11},
                {x:130, y:14},
                {x:140, y:14},
                {x:150, y:15}
            ];
            this.myChart = new Chart("myChart", {
            type: "scatter",
            data: {
                datasets: [{
                pointRadius: 4,
                pointBackgroundColor: "rgba(0,0,255,1)",
                data: dataList,
                }]
            },
            options: {}
            });
            this.chartReady = true;
        }
    }
</script>

<template>
    <div>
        <canvas id="myChart" style="width:100%;max-width:700px"></canvas>
    </div>
    Here be graphs (soon).
    <div>
        <button @click="updateGraph">Update graph</button>
    </div>
</template>