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
    convertDate (str) {
      const date = new Date(str)
      const month = date.toLocaleString('default', { month: 'long' })
      return `${month} ${date.getDay()}, ${date.getFullYear()}`
    },
    handleAnimation () {
      this.$nextTick(() => {
        this.$_fadeIn(this.$refs.header, 0, 24, 'top+=58', 0, 1.2)

        this.$_fadeIn(this.$refs.webinars, 0, 68, 'top+=58', 0, 1.2)
      })
    }
  }
}
</script>

<style lang='sass' src='./custom-ria-webinar.sass'></style>
