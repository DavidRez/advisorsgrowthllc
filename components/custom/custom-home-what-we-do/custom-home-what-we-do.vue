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
      this.$nextTick(() => {
        this.$refs.bullets.forEach((bullet, i) => {
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
            ease: 'customEaseOut'
          })
        })
      })
      this.$nextTick(() => {
        if (this.props.cta) {
          this.$_fadeIn(this.$refs.cta, 24, 0, 'top+=58', 0.5, 1.2)
        }
        this.$_fadeIn(this.$refs.stripe, -400, -400, 'top+=58', 1, 1.2)
      })
    }
  }
}
</script>

<style lang='sass' src='./custom-home-what-we-do.sass'></style>
