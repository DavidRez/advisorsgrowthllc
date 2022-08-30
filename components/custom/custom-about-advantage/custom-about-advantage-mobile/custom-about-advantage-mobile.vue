<template lang='pug' src='./custom-about-advantage-mobile.pug'></template>

<script>
export default {
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
      this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
      this.$nextTick(() => {
        this.$refs.stages.forEach((stage, i) => {
          this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
          const stagetl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              start: 'top+=48 bottom'
            }
          })
          const delay = 0.1 + (0.1 * i)
          stagetl.from(stage, {
            opacity: 0,
            x: '100',
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

<style lang='sass' src='./custom-about-advantage-mobile.sass'></style>
