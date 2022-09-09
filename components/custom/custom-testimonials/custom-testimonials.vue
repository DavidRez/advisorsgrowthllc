<template lang='pug' src='./custom-testimonials.pug'></template>

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
        this.$refs.testimonials.forEach((testimonial, i) => {
          this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
          const testimonialtl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: testimonial.$el,
              start: '+48 bottom'
            }
          })
          const delay = 0.1 + (0.1 * i)
          testimonialtl.from(testimonial.$el, {
            opacity: 0,
            y: '32',
            delay,
            duration: 1.5,
            ease: 'customEaseOut'
          })
        })
      })
    }
  }
}
</script>

<style lang='sass' src='./custom-testimonials.sass'></style>
