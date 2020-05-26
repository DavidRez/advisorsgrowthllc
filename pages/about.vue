<template lang='pug' src='./about.pug'></template>

<script>
export default {
  components: {
  },
  computed: {
    props () {
      return this.$store.state.pages.about
    }
  }
}
</script>
