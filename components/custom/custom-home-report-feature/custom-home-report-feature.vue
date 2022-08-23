<template lang="pug" src="./custom-home-report-feature.pug"></template>

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
      if (this.props.image) {
        this.$_fadeIn(this.$refs.image.$el, 24, 0, 'top+=58', 0, 1.2)
      }
      if (this.props.title || this.props.body) {
        this.$_fadeIn(this.$refs.text, 24, 0, 'top+=58', 0, 1.2)
      }
      if (this.props.links) {
        this.$_fadeIn(this.$refs.links, 24, 0, 'top+=58', 0, 1.2)
      }
    }
  }
}

</script>

<style lang="sass" src="./custom-home-report-feature.sass"></style>
