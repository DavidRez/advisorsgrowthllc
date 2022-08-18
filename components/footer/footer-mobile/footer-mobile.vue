<template lang="pug" src="./footer-mobile.pug"></template>

<script>

export default {
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    links: {
      type: Array,
      default: () => ([])
    },
    top: {
      type: Function,
      default: () => ({})
    }
  }
}
</script>

<style lang="sass" src="./footer-mobile.sass"></style>
