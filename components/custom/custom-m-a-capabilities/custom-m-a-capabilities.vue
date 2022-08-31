<template lang="pug" src="./custom-m-a-capabilities.pug"></template>

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
    windowWidth: null
  }),
  mounted () {
    this.handleResize()
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
  methods: {
    debounceFunc () {
      this.debounce(this.handleResize, null, 300)
    },
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    handleAnimation () {
      this.$nextTick(() => {
        if (this.windowWidth > 1100) {
          this.$_fadeIn(this.$refs.imageDesktop.$el, 0, -250, 'top+=58', 0, 1.5)
        } else {
          this.$_fadeIn(this.$refs.imageMobile.$el, 0, -250, 'top+=58', 0, 1.5)
        }
        this.$_fadeIn(this.$refs.header, 24, 0, 'top+=58', 0, 1.2)
        this.$refs.blocks.forEach((block, i) => {
          this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
          const blocktl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: block,
              start: 'top+=48 bottom'
            }
          })
          const delay = 0.1 + (0.1 * i)
          blocktl.from(block, {
            opacity: 0,
            x: 32,
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

<style lang="sass" src="./custom-m-a-capabilities.sass"></style>
