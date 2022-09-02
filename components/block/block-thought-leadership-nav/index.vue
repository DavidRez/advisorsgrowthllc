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
    overlayStartVisible: false,
    overlayEndVisible: false,
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
        this.overlayStartVisible = false
        this.overlayEndVisible = false
        this.$refs.navContainer.removeEventListener('scroll', this.handleScrollOverlay)
      }
    },
    handleScrollOverlay () {
      const container = this.$refs.navContainer
      const nav = this.$refs.nav
      container.clientWidth + container.scrollLeft < nav.scrollWidth ? this.overlayEndVisible = true : this.overlayEndVisible = false
      container.scrollLeft > 5 ? this.overlayStartVisible = true : this.overlayStartVisible = false
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
