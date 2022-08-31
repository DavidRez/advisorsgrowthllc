<template lang='pug' src='./custom-about-advantage-desktop.pug'></template>

<script>
import { fadeIn, debounce } from '~/resources/mixins'

export default {
  mixins: [fadeIn, debounce],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    active: null,
    windowWidth: 0
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
    window.addEventListener('resize', this.debounceFunc)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceFunc)
  },
  methods: {
    debounceFunc () {
      this.debounce(this.handleResize, null, 300)
    },
    handleResize () {
      this.windowWidth = window.innerWidth
      if (this.windowWidth >= 1025) {
        this.active = null
      }
    },
    changeCircle (i) {
      this.active = i
    },
    handleAnimation () {
      this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
      this.$nextTick(() => {
        this.$refs.circles.forEach((circle, i) => {
          this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
          const circletl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: circle,
              start: 'top+=48 bottom'
            }
          })
          const delay = 0.1 + (0.1 * i)
          circletl.from(circle, {
            opacity: 0,
            scale: 0,
            delay,
            duration: 0.8,
            ease: 'customEaseOut'
          })
        })
      })
    }
  }
}
</script>

<style lang='sass' src='./custom-about-advantage-desktop.sass'></style>
