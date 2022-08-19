<template lang="pug" src="./block-content.pug"></template>

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
      if (this.props.header) {
        this.$_fadeIn(this.$refs.header, 24, 0, 'top+=58', 0, 1.2)
      }
      if (this.props.subheader) {
        this.$_fadeIn(this.$refs.subheader, 24, 0, 'top+=58', 0, 1.2)
      }
      if (this.props.body || this.props.links) {
        this.$_fadeIn(this.$refs.text, 24, 0, 'top+=58', 0, 1.2)
      }
      if (this.props.has_image) {
        this.$_fadeIn(this.$refs.image, 24, 0, 'top+=58', 0, 1.2)
      }
    }
  }
}

</script>

<style lang="sass" src="./block-content.sass"></style>
