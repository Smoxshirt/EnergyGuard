<script setup>
import PowerConsumption from '../components/PowerConsumption.vue'
</script>



<template>
    <div>
      <PowerConsumption @interval-emit="intervalTen" :devices="devices"/>
    </div>
</template>

<script>
export default {
      name: 'Placeholder',
      components: {
        PowerConsumption
      },
      emits: ['interval-emit'],
      data() {
        return {
          devices: [],
        }
      },
      methods: {
        intervalTen(){
          setInterval(()=>this.filterId(),10000)
        },
        filterId(){
          for(let i = 0; i<this.devices.length; i++){
            this.devices[i].consumption = this.devices[i].consumption + this.devices[i].watt;
          }
        //  this.devices = this.devices.map((device) => device.consumption = device.consumption*id)
          // this.devices = this.devices.filter((device) => device.id !== id)
        }
      },
      mounted(){
        this.intervalTen()
      },
      created(){
       this.devices =[
              {
        id: 1,
        name: 'lamp',
        consumption: 0.135, //watth
        watt: 0.135,
        slot: 'A',
        isConnected: false
      },
      {
        id: 2,
        name: 'lamp two',
        consumption: 0.270,
        watt: 0.135,
        slot: 'B',
        isConnected: false
      },
      ]
     },
     beforeUnmount(){
      clearInterval(this.intervalTen())
     }
    }
</script>