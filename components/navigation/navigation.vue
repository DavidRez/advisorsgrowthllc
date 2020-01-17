<template lang='pug' src='./navigation.pug'></template>

<script>
import router from '~/router/index'

export default {
  computed: {
    // props () {
    //   return this.$store.state.globalData
    // },
    links () {
      return router.filter((link) => {
        return link.navigation
      })
    }
  }
}
</script>

<style lang="sass" src="./navigation.sass"></style>
