<template lang="pug" src="./custom-m-a-blocks.pug"></template>
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
      this.$refs.texts.forEach((text) => {
        const tl = this.$gsap.timeline({
          scrollTrigger: {
            trigger: text,
            start: 'top+=48 bottom'
          }
        })
        this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
        tl.from(text, {
          y: 24,
          opacity: 0,
          duration: 1.2,
          ease: 'customEaseOut'
        })
      })
    }
  }
}
</script>
<style lang="sass" src="./custom-m-a-blocks.sass"></style>
