<template lang='pug' src='./custom-contact-section.pug'></template>

<script>
import { setData } from '~/resources/utils'
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
    global: null
  }),
  async fetch () {
    this.global = await setData('global', 'globalData')
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
      if (this.props.header) {
        this.$_fadeIn(this.$refs.header, 24, 0, 'top+=58', 0, 1.2)
      }
      if (this.props.subheader) {
        this.$_fadeIn(this.$refs.subheader, 24, 0, 'top+=58', 0, 1.2)
      }
    }
  }
}
</script>

<style lang='sass' src='./custom-contact-section.sass'></style>
