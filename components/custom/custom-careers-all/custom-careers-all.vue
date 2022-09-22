<template lang='pug' src='./custom-careers-all.pug'></template>

<script>
import { fadeIn } from '~/resources/mixins'

export default {
  mixins: [fadeIn],
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    careers: {
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
      this.$nextTick(() => {
        if (this.props.title) {
          this.$_fadeIn(this.$refs.title, 24, 0, 'top+=58', 0, 1.2)
        }
        this.$refs.careers.forEach((career, i) => {
          this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
          const careertl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: career.$el,
              start: '+48 bottom'
            }
          })
          const delay = 0.1 + (0.1 * i)
          careertl.from(career.$el, {
            opacity: 0,
            y: '32',
            delay,
            duration: 0.5,
            ease: 'customEaseOut'
          })
        })
      })
    }
  }
}
</script>

<style lang='sass' src='./custom-careers-all.sass'></style>
