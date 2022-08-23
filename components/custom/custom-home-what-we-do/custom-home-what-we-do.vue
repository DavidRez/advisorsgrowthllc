<template lang='pug' src='./custom-home-what-we-do.pug'></template>

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
  computed: {
    dataValues () {
      return this.props.data.map(item => ({ value: 0, target: item.target_number, label: item.label }))
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
      this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
      const tl = this.$gsap.timeline()
      const stripe = this.$refs.stripe
      this.$nextTick(() => {
        this.$refs.bullets.forEach((bullet, i) => {
          this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
          const bullettl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: bullet,
              start: 'top+=48 bottom'
            }
          })
          const delay = 0.1 + (0.1 * i)
          bullettl.from(bullet, {
            opacity: 0,
            x: 32,
            delay,
            duration: 0.8,
            ease: 'customEastOut'
          })
        })
      })
      if (this.props.cta) {
        this.$_fadeIn(this.$refs.cta, 24, 0, 'top+=58', 0, 1.2)
      }
      tl.from(stripe, {
        x: '-400',
        y: '-400',
        opacity: 0.5,
        duration: 0.25,
        delay: 0.25,
        ease: 'customEaseOut'
      })
    }
  }
}
</script>

<style lang='sass' src='./custom-home-what-we-do.sass'></style>
