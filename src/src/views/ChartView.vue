<script>
import PieChartView from '../views/PieChartView.vue';
import './main.css';
import './mobile.css';

export default {
    name: 'ChartView',
    components: {
        PieChartView
    },
    props: {
        dataArray: Array,
        nameArray: Array
    }
};
</script>

<template>
    <div class="chart-view">
        <h1 class="h1energy">Energy consumption</h1>
        <h3>Last 7 days</h3>
        <PieChartView 
        :dataArray="this.dataArray"
        :nameArray="this.nameArray"/>
    </div>
</template>