<template lang='pug' src='./custom-ria-webinar.pug'></template>

<script>
import { fadeIn } from '~/resources/mixins'

export default {
  mixins: [fadeIn],
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    webinars: {
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
        this.$_fadeIn(this.$refs.header, 24, 0, 'top+=58', 0, 1.2)

        this.$refs.webinars.forEach((webinar, i) => {
          this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
          const webinartl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: webinar,
              start: 'center bottom'
            }
          })
          const delay = 0.1 + (0.1 * i)
          webinartl.from(webinar, {
            opacity: 0,
            x: '70',
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

<style lang='sass' src='./custom-ria-webinar.sass'></style>
