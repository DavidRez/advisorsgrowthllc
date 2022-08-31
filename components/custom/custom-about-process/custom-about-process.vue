<template lang='pug' src='./custom-about-process.pug'></template>

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
  data: () => ({
    active: 0
  }),
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
    changeTab (i) {
      this.active = i
    },
    handleAnimation () {
      this.$nextTick(() => {
        this.$refs.tabs.forEach((tab, i) => {
          this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
          const tabtl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: tab,
              start: 'top+=48 bottom'
            }
          })
          const delay = 0.1 + (0.1 * i)
          tabtl.from(tab, {
            opacity: 0,
            x: '32',
            delay,
            duration: 0.8,
            ease: 'customEaseOut'
          })
        })
      })
      this.$nextTick(() => {
        this.$_fadeIn(this.$refs.title, 24, 0, 'top+=58', 1, 1.2)
        this.$_fadeIn(this.$refs.body, 24, 0, 'top+=58', 1, 1.2)
      })
    }
  }
}
</script>

<style lang='sass' src='./custom-about-process.sass'></style>
