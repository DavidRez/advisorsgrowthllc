<template lang="pug" src="./block-arrow-label-button.pug"></template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    page: {
      type: String,
      default: ''
    },
    reverse: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="sass" src="./block-arrow-label-button.sass"></style>
