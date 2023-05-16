<script>
import PieChartView from '../views/PieChartView.vue';
import './main.css';
import './mobile.css';

export default {
    name: 'ChartView',
    components: {
        PieChartView
    },
    props: ["dataArray", "nameArray", "priceData", "model"],
    computed: {
            priceTitle() {
                const date=new Date();
                console.log(this.priceData.data[date.getHours()])
                return this.priceData.data[date.getHours()].SEK_per_kWh;
            }
        },
    methods: {
        getPrice(){
                this.$emit('getPrice')
            }
    }
};
</script>

<template>
    <div class="chart-view">
        <h1 class="h1energy">Energy consumption in mWh</h1>
        <h3>Last 7 days</h3>
        <PieChartView 
        :dataArray="this.dataArray"
        :nameArray="this.nameArray"/>
        <h3>Current electricity price: {{ priceTitle }} kr/KWh</h3>
    </div>
</template>