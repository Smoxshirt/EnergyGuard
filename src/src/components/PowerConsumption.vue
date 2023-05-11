<template>
    <h1>Power consumption</h1>
    <div  :key="device.id" v-for="device in this.devices"> 
    <h2>Device name: {{ device.name }}</h2>
    <h3>watt rate: {{device.watt }} W</h3>
    <h3 >Device consumption: {{device.consumption.toFixed(2)}}  </h3>
    <!-- v-on:mouseover="onTest(device.id)"  -->
    <!-- <button v-on:mouseover="onTest(device.id)">click</button> -->

    </div>
</template>

<script>
export default {
    name: 'PowerConsumption',
    props: {
       devices: Array,
    },
    methods:{

        onTest(id) {
            this.$emit('interval-emit', id)
        }
    }
}


    </script>