<template lang="pug" src="./block-links.pug"></template>

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
      if (this.props.links) {
        this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
        this.$nextTick(() => {
          this.$refs.links.forEach((link, i) => {
            this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
            const linktl = this.$gsap.timeline({
              scrollTrigger: {
                trigger: link,
                start: 'top+=48 bottom'
              }
            })
            const delay = 0.1 + (0.1 * i)
            linktl.from(link, {
              opacity: 0,
              x: 32,
              delay,
              duration: 0.8,
              ease: 'customEastOut'
            })
          })
        })
      }
    }
  }
}

</script>

<style lang="sass" src="./block-links.sass"></style>
