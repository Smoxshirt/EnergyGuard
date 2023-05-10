<script>
    import Chart from 'chart.js';
    import './main.css';
    import './mobile.css';
    export default {
        data(){
            return {
                lineChart: [],
                colorArray: ['#c7858f', '#8592c7', '#85c0c7', '#86c785', '#c7af85']
            }
        },
        props: {
            labelArray: Array,
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
                            datasets: [],
                            labels: this.labelArray
                        },
                        options: {
                            events: ['click']
                        }
                    }
                    for (let i = 0; i < this.dataArray.length; i++){
                        chartConfig.data.datasets[i] = {
                            label: this.nameArray[i],
                            data: this.dataArray[i],
                            backgroundColor: this.colorArray[i],
                            borderColor: this.colorArray[i],
                            fill: false,
                            borderWidth: 5
                        }
                    }
                    /* this.lineChart = new Chart("lineChart", {
                    type: 'line',
                    data: {
                    datasets: [
                        {
                            label: 'device1',
                            data: this.dataList1,
                            backgroundColor: '#2A4B51',
                            borderColor: '#2A4B51',
                            fill: false,
                            borderWidth: 5
                        },
                        {
                            label: 'device2',
                            data: this.dataList2,
                            backgroundColor: '#4B115A',
                            borderColor: '#4B115A',
                            fill: false,
                            borderWidth: 5
                        },
                        {
                            label: 'device3',
                            data: this.dataList3,
                            backgroundColor: '#3AAA11',
                            borderColor: '#3AAA11',
                            fill: false,
                            borderWidth: 5,
                            hidden: true
                        }],
                        labels: this.labelList1
                        },
                        options: {
                            events: ['click']
                        }
                    }) */
                    this.lineChart = new Chart("lineChart", chartConfig);
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
</template>