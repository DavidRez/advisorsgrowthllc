<template lang="pug" src="./hero-home.pug"></template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  data () {
    return {
      show: 0,
    }
  },
}
</script>

<style lang="sass" src="./hero-home.sass"></style>
