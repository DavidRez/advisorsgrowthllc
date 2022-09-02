<template lang='pug' src='./custom-about-process.pug'></template>

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
  data: () => ({
    active: 0
  }),
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
    changeTab (i) {
      this.active = i
    },
    handleAnimation () {
      this.$nextTick(() => {
        this.$_fadeIn(this.$refs.box, 24, 0, 'top+=58', 0, 1.2)
        this.$_fadeIn(this.$refs.tabs, 0, 60, 'top+=58', 0, 2)
        this.$_fadeIn(this.$refs.title, 24, 0, 'top+=58', 0.5, 1.2)
        this.$_fadeIn(this.$refs.body, 24, 0, 'top+=58', 0.5, 1.2)
      })
    }
  }
}
</script>

<style lang='sass' src='./custom-about-process.sass'></style>
