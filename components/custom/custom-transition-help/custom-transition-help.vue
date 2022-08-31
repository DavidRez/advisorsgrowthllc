<template lang="pug" src="./custom-transition-help.pug"></template>

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
      this.$nextTick(() => {
        if (this.props.header) {
          this.$_fadeIn(this.$refs.header, 24, 0, 'top+=58', 0, 1.2)
        }
        if (this.props.body) {
          this.$_fadeIn(this.$refs.text, 24, 0, 'top+=58', 0.5, 1.2)
        }
        this.$refs.items.forEach((item, i) => {
          this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
          const itemtl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top+=48 bottom'
            }
          })
          const delay = 0.1 + (0.1 * i)
          itemtl.from(item, {
            opacity: 0,
            x: '32',
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

<style lang="sass" src="./custom-transition-help.sass"></style>
