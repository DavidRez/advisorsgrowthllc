<template lang='pug' src='./custom-m-a-what-we-do.pug'></template>

<script>
import { fadeIn, debounce } from '~/resources/mixins'

export default {
  mixins: [fadeIn, debounce],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    maxHeight: 0
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
    this.setHeight()
    window.addEventListener('resize', this.debounceFunc)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceFunc)
  },
  methods: {
    debounceFunc () {
      this.debounce(this.setHeight, null, 300)
    },
    setHeight () {
      this.$nextTick(() => {
        const labels = this.$refs.labels.map((a) => {
          return a.clientHeight
        })
        this.maxHeight = `${Math.max(...labels) + 32}px`
      })
    },
    handleAnimation () {
      this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
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
    }
  }
}
</script>

<style lang='sass' src='./custom-m-a-what-we-do.sass'></style>
