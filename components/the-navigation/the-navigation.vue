<template lang='pug' src='./the-navigation.pug'></template>

<script>

export default {
  computed: {
    // props () {
    //   return this.$store.state.globalData
    // },
    links () {
      const routes = this.$router.options.routes.filter(route => route.meta)
      return routes.filter(route => route.meta.includes('dev') && route.meta.includes('navigation'))
    },
  },
}
</script>

<style lang="sass" src="./the-navigation.sass"></style>
