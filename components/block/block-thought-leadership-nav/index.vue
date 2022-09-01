<template lang='pug' src='./index.pug'></template>

<script>
import router from '~/router/thought-leadership'

export default {
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    overlayVisible: false,
    windowWidth: 0
  }),
  computed: {
    links () {
      return router
    }
  },
  mounted () {
    this.handleScreenSize()
    window.addEventListener('resize', this.handleScreenSize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleScreenSize)
  },
  methods: {
    handleScreenSize () {
      this.windowWidth = window.innerWidth
      if (this.windowWidth <= 1060) {
        this.handleScrollOverlay()
        this.$refs.navContainer.addEventListener('scroll', this.handleScrollOverlay)
      } else {
        this.$refs.navContainer.removeEventListener('scroll', this.handleScrollOverlay)
      }
    },
    handleScrollOverlay () {
      if (this.$refs.navContainer.clientWidth + this.$refs.navContainer.scrollLeft < this.$refs.nav.scrollWidth) {
        this.overlayVisible = true
      } else {
        this.overlayVisible = false
      }
      console.log(this.$refs.navContainer.clientWidth + this.$refs.navContainer.scrollLeft)
      console.log(this.$refs.nav.scrollWidth)
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
