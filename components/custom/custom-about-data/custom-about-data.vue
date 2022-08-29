<template lang="pug" src="./custom-about-data.pug"></template>

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
      this.$nextTick(() => {
        this.$refs.columns.forEach((column, i) => {
          this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
          const columntl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: column,
              start: 'top+=48 bottom'
            }
          })
          const delay = 0.1 + (0.1 * i)
          columntl.from(column, {
            opacity: 0,
            y: '32',
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

<style lang="sass" src="./custom-about-data.sass"></style>
