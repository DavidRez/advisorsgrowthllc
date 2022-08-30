<template lang="pug" src="./custom-m-a-case-study-mobile.pug"></template>

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
    windowWidth: null,
    active: ''
  }),
  mounted () {
    this.setActive(this.props.column_one_label)
    this.handleResize()
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
    window.addEventListener('resize', this.debounceFunc)
  },
  methods: {
    setActive (str) {
      this.active = str
    },
    debounceFunc () {
      this.debounce(this.handleResize, null, 300)
    },
    handleResize () {
      this.windowWidth = window.innerWidth
    },
    handleAnimation () {
      this.$_fadeIn(this.$refs.image.$el, 0, -250, 'top+=58', 0, 1.5)
      this.$_fadeIn(this.$refs.header, 24, 0, 'top+=58', 0, 1.2)
      this.$_fadeIn(this.$refs.body, 24, 0, 'top+=58', 0, 1.2)
      this.$_fadeIn(this.$refs.firstRow, 24, 32, 'top+=48', 0, 1.2)
      this.$nextTick(() => {
        this.$refs.rows.forEach((row, i) => {
          this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
          const rowtl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: 'top+=48 bottom'
            }
          })
          const delay = 0.1 + (0.1 * i)
          rowtl.from(row, {
            opacity: 0,
            x: 32,
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

<style lang="sass" src="./custom-m-a-case-study-mobile.sass"></style>
