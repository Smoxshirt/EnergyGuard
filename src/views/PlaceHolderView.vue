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
</template>