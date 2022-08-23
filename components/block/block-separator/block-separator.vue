<template lang="pug" src="./block-separator.pug"></template>

<script>
import { fadeIn, parallax } from '~/resources/mixins'

export default {
  mixins: [fadeIn, parallax],
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
      if (this.props.header) {
        this.$_fadeIn(this.$refs.title, 24, 0, 'top+=58', 0, 1.2)
      }
      if (this.props.subheader) {
        this.$_fadeIn(this.$refs.title, 24, 0, 'top+=58', 0, 1.2)
      }
      if (this.props.content) {
        this.$_fadeIn(this.$refs.text, 24, 0, 'top+=58', 0, 1.2)
      }
    }
  }
}

</script>

<style lang="sass" src="./block-separator.sass"></style>
