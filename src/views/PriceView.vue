<script>
    import Chart from 'chart.js';
    import './main.css';
    import './mobile.css';
    export default {
        data(){
            return {
                myChart: [],
                chartReady: false
            }
        },
        props:  ["priceData", "isSignedIn"],
        computed: {
            priceTitle() {
                const date=new Date();
                console.log(this.priceData.data[date.getHours()])
                return this.priceData.data[date.getHours()].SEK_per_kWh;
            }
        },
        methods: {
            updateGraph(){
            console.log("Updated");
            const newList = [
                {x:0, y:this.priceData.data[0].SEK_per_kWh},
                {x:1, y:this.priceData.data[1].SEK_per_kWh},
                {x:2, y:this.priceData.data[2].SEK_per_kWh},
                {x:3, y:this.priceData.data[3].SEK_per_kWh},
                {x:4, y:this.priceData.data[4].SEK_per_kWh},
                {x:5, y:this.priceData.data[5].SEK_per_kWh},
                {x:6, y:this.priceData.data[6].SEK_per_kWh},
                {x:7, y:this.priceData.data[7].SEK_per_kWh},
                {x:8, y:this.priceData.data[8].SEK_per_kWh},
                {x:9, y:this.priceData.data[9].SEK_per_kWh},
                {x:10, y:this.priceData.data[10].SEK_per_kWh},
                {x:11, y:this.priceData.data[11].SEK_per_kWh},
                {x:12, y:this.priceData.data[12].SEK_per_kWh},
                {x:13, y:this.priceData.data[13].SEK_per_kWh},
                {x:14, y:this.priceData.data[14].SEK_per_kWh},
                {x:15, y:this.priceData.data[15].SEK_per_kWh},
                {x:16, y:this.priceData.data[16].SEK_per_kWh},
                {x:17, y:this.priceData.data[17].SEK_per_kWh},
                {x:18, y:this.priceData.data[18].SEK_per_kWh},
                {x:19, y:this.priceData.data[19].SEK_per_kWh},
                {x:20, y:this.priceData.data[20].SEK_per_kWh},
                {x:21, y:this.priceData.data[21].SEK_per_kWh},
                {x:22, y:this.priceData.data[22].SEK_per_kWh},
                {x:23, y:this.priceData.data[23].SEK_per_kWh}
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
        },
            getPrice(){
                this.$emit('getPrice')
            }
        },
        created(){

        },
        mounted(){
            // const ctx = document.getElementById('myChart');
            const dataList = [
                {x:0, y:this.priceData.data[0].SEK_per_kWh},
                {x:1, y:this.priceData.data[1].SEK_per_kWh},
                {x:2, y:this.priceData.data[2].SEK_per_kWh},
                {x:3, y:this.priceData.data[3].SEK_per_kWh},
                {x:4, y:this.priceData.data[4].SEK_per_kWh},
                {x:5, y:this.priceData.data[5].SEK_per_kWh},
                {x:6, y:this.priceData.data[6].SEK_per_kWh},
                {x:7, y:this.priceData.data[7].SEK_per_kWh},
                {x:8, y:this.priceData.data[8].SEK_per_kWh},
                {x:9, y:this.priceData.data[9].SEK_per_kWh},
                {x:10, y:this.priceData.data[10].SEK_per_kWh},
                {x:11, y:this.priceData.data[11].SEK_per_kWh},
                {x:12, y:this.priceData.data[12].SEK_per_kWh},
                {x:13, y:this.priceData.data[13].SEK_per_kWh},
                {x:14, y:this.priceData.data[14].SEK_per_kWh},
                {x:15, y:this.priceData.data[15].SEK_per_kWh},
                {x:16, y:this.priceData.data[16].SEK_per_kWh},
                {x:17, y:this.priceData.data[17].SEK_per_kWh},
                {x:18, y:this.priceData.data[18].SEK_per_kWh},
                {x:19, y:this.priceData.data[19].SEK_per_kWh},
                {x:20, y:this.priceData.data[20].SEK_per_kWh},
                {x:21, y:this.priceData.data[21].SEK_per_kWh},
                {x:22, y:this.priceData.data[22].SEK_per_kWh},
                {x:23, y:this.priceData.data[23].SEK_per_kWh}
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
        <div>
            <canvas id="myChart" class="canvas"></canvas>
        </div>
        
        <div>
            <button class="buttons2-autoWidth" @click="updateGraph">Update graph</button>
        </div>

    <h3>Live price: {{ priceTitle }} kr/KWh</h3>
    <h3 class="nomargin-nopadding">Last 24 hours: {{ priceTitle }} kr/KWh</h3>
    </div>

</template>