<template lang='pug' src='./navigation.pug'></template>

<script>
import { postFetchHelper } from '../../resources/utils'
import router from '~/router/index'

export default {
  data: () => ({
    content: null
  }),
  computed: {
    links () {
      return router.filter((link) => {
        return link.navigation
      })
    }
  },
  async fetch () {
    this.content = await postFetchHelper('navigation', 'globalData')
  }
}
</script>

<style lang="sass" src="./navigation.sass"></style>
