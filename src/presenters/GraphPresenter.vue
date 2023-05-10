<script>
    import GraphView from '../views/GraphView.vue'
    import { getCurrentPrice } from '../priceSource';
    import { resolvePromise } from '../resolvePromise';
    export default {
        props: {
            model: {}
        },
        data(){
            return {

            }
        },
        computed: {
            priceData(){
                if (this.model.pricePromiseState.data == null) {
                    this.model.pricePromiseState.data = { price: "Waiting for a price..." };
                }
                return this.model.pricePromiseState;
            },
        },
        components: {
            GraphView
        },
        created() {
            if (this.model.pricePromiseState.promise == undefined)
                resolvePromise(getCurrentPrice(), this.model.pricePromiseState);
        },

        methods: {
            getPrice(){
                this.model.getCurrentEnergyPrice();
            }
            
        }
    }
</script>

<template>
    <div>
        <GraphView
        
        :priceData="priceData"
        @getPrice="getPrice"
        :isSignedIn=this.model.isSignedIn />
    </div>
</template>