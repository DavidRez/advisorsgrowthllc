<template lang="pug" src="./block-text.pug"></template>

<script>
import { debounce, fadeIn } from '~/resources/mixins'

export default {
  mixins: [
    debounce,
    fadeIn
  ],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    navHeight: 0
  }),
  mounted () {
    this.$store.dispatch('VIEW_SITE', true)
    this.handleAnimation()
    this.getNavHeight()
    window.addEventListener('resize', this.debounceFunc)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceFunc)
  },
  methods: {
    debounceFunc () {
      this.debounce(this.getNavHeight, null, 300)
    },
    getNavHeight () {
      this.$nextTick(() => {
        const navHeight = document.querySelector('.navigation__top').clientHeight
        this.navHeight = `${navHeight}px`
      })
    },
    handleAnimation () {
      this.$nextTick(() => {
        if (this.props.title) {
          this.$_fadeIn(this.$refs.title, 24, 0, 'top+=58', 0, 1.2)
        }
        if (this.props.body) {
          this.$_fadeIn(this.$refs.body, 24, 0, 'top+=58', 0, 1.2)
        }
      })
    }
  }
}

</script>

<style lang="sass" src="./block-text.sass"></style>
