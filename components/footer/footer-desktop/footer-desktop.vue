<template lang="pug" src="./footer-desktop.pug"></template>

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

<style lang="sass" src="./footer-desktop.sass"></style>
