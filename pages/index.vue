<template lang='pug' src='./index.pug'></template>

<script>
export default {
  components: {
  },
  computed: {
    props () {
      return this.$store.state.pages.home
    }
  }
}
</script>
