<script>
  export default {
    props: {
      model: {
        type: Object,
        default: {testText: "hej"}
      }
    }
  }
</script>

<template>
    <div>
      Placeholder view. Model access example: <br> {{ this.model.testText }}
    </div>
    <div v-for="device in model.devices">
      {{ device.id }}:
      <span v-for="update in device.consumption">{{ update[0] }} &nbsp;</span>
    </div>
</template>