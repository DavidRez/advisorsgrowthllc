<template lang='pug' src='./about.pug'></template>

<script>
import { setMeta } from '~/resources/utils'

export default {
  components: {
  },
  computed: {
    props () {
      return this.$store.state.pages.about
    }
  },
  head () {
    return setMeta(this.props)
  }
}
</script>
