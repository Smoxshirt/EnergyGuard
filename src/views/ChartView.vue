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
        <PieChartView 
        :dataArray="this.dataArray"
        :nameArray="this.nameArray"/>
    </div>
</template>