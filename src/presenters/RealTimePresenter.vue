<script>
    import RealTimeLineGraphView from '../views/RealTimeLineGraphView.vue';
    export default {
        components: {
            RealTimeLineGraphView
        },
        data(){
            return {
                endTime: 0,
                startTime: 0,
                dataArray: [],
                labelArray: [1,2,3,4,5,6,7,8,9,10],
                name: "",
                deviceIndex: 0,
                dataReady: false
            }
        },
        props: {
            model: {}
        },
        created(){
            
        },
        mounted(){
            this.generateGraphArrays(this.deviceIndex);
        },
        updated(){

        },
        beforeUpdate(){
            this.generateGraphArrays(this.deviceIndex);
        },
        methods: {
            generateGraphArrays(index){
                if(this.model.hasDevices){
                    this.dataArray = new Array(10);
                    let consIndex = this.model.devices[index].consumption.length - 1;
                    if(consIndex > 8){
                        for(let i = 0; i < 10; i++){
                            this.dataArray[9 - i] = this.model.devices[index].consumption[consIndex - i][0];
                            this.labelArray[9 - i] = this.model.devices[index].consumption[consIndex - i][1];
                        }
                    }else{
                        let diff = 9 - consIndex;
                        for(let i = 0; i < (consIndex + 1); i++){
                            this.dataArray[9 - i] = this.model.devices[index].consumption[consIndex - i][0];
                            this.labelArray[9 - i] = this.model.devices[index].consumption[consIndex - i][1];
                        }
                        for(let i = (diff - 1); i > -1; i--){
                            this.dataArray[i] = 0;
                            this.labelArray[i] = 0;
                        }
                    }
                    this.name = this.model.devices[index].name;
                    this.dataReady = true;
                    console.log("Generate done!");
                }
            }
        }
    }
</script>

<template>
    <div class="general-container">
        <RealTimeLineGraphView v-if="this.dataReady"
        :dataArray="this.dataArray" 
        :labelArray="this.labelArray"
        :name="this.name" 
        :holder="this.model.devices[0].consumption"
        :isSignedIn=this.model.isSignedIn />
    </div>
</template>