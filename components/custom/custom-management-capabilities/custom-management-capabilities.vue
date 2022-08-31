<template lang="pug" src="./custom-management-capabilities.pug"></template>

<script>
import { fadeIn } from '~/resources/mixins'

export default {
  mixins: [fadeIn],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {
    if (this.$store.state.siteLoaded) {
      this.handleAnimation()
    } else {
      this.$store.watch(
        state => this.$store.state.siteLoaded,
        (newVal) => {
          if (newVal) {
            this.handleAnimation()
          }
        }
      )
    }
  },
  methods: {
    handleAnimation () {
      this.$nextTick(() => {
        if (this.props.section.title) {
          this.$_fadeIn(this.$refs.title, 24, 0, 'top+=58', 0, 1.2)
        }
        if (this.props.section.image) {
          this.$_fadeIn(this.$refs.image.$el, 24, 0, 'top+=58', 0, 1.2)
        }
        if (this.props.section.content) {
          this.$_fadeIn(this.$refs.content, 24, 0, 'top+=58', 0, 1.2)
        }
      })
    }
  }
}

</script>

<style lang="sass" src="./custom-management-capabilities.sass"></style>
