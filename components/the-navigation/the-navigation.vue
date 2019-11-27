<template lang='pug' src='./the-navigation.pug'></template>

<script>
import router from '~/router/index'

export default {
  computed: {
    // props () {
    //   return this.$store.state.globalData
    // },
    links () {
      return router
    }
  }
}
</script>

<style lang="sass" src="./the-navigation.sass"></style>
