<template lang="pug" src="./custom-home-future.pug"></template>

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
      if (this.props.header) {
        this.$_fadeIn(this.$refs.header, 24, 0, 'top+=58', 0, 1.2)
      }
      if (this.props.body) {
        this.$_fadeIn(this.$refs.body, 24, 0, 'top+=58', 0, 1.2)
      }
      if (this.props.image) {
        this.$_fadeIn(this.$refs.image.$el, 24, 0, 'top+=78', 0, 1.2)
      }
      this.$nextTick(() => {
        this.$refs.topics.forEach((topic, i) => {
          this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
          const topictl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: topic,
              start: 'top+=48 bottom'
            }
          })
          const delay = 0.1 + (0.1 * i)
          topictl.from(topic, {
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

<style lang="sass" src="./custom-home-future.sass"></style>
