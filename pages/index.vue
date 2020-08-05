<template lang='pug' src='./index.pug'></template>

<script>
import { setMeta } from '~/resources/utils'

export default {
  components: {
  },
  computed: {
    props () {
      return this.$store.state.pages.home
    }
  },
  head () {
    return setMeta(this.props)
  }
}
</script>
