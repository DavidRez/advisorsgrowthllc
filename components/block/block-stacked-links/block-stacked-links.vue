<template lang="pug" src="./block-stacked-links.pug"></template>

<script>
import { fadeIn } from '~/resources/mixins'

export default {
  mixins: [fadeIn],
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    links: {
      type: Array,
      default: () => ([])
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
      if (this.props) {
        this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
        this.$nextTick(() => {
          this.$refs.links.forEach((link, i) => {
            const linktl = this.$gsap.timeline({
              scrollTrigger: {
                trigger: link,
                start: 'top+=48 bottom'
              }
            })
            const delay = this.delay + (0.1 * i)
            linktl.from(link, {
              opacity: 0,
              y: 24,
              x: 0,
              delay,
              duration: 1.25,
              ease: 'customEaseOut'
            })
          })
        })
      }
    }
  }
}

</script>

<style lang="sass" src="./block-stacked-links.sass"></style>
