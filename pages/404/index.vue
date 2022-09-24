<template lang="pug">
  .pages-404(:style="{ minHeight: `${elemMinHeight}px` }")
    .pages-404__container
      h1.pages-404__title(ref='title') Page Not Found
      .pages-404__col(ref='text')
        nuxt-link.pages-404__button(to='/') Go to Home page.
</template>

<script>
import { debounce, fadeIn } from '~/resources/mixins'

export default {
  components: {},
  mixins: [
    debounce,
    fadeIn
  ],
  data: () => ({
    elemMinHeight: 0,
    windowWidth: 0
  }),
  mounted () {
    this.handleWindowResize()
    window.addEventListener('resize', this.debounceFunc)
    this.$nextTick(() => {
      this.$store.dispatch('VIEW_SITE', true)
      this.handleAnimation()
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceFunc)
  },
  methods: {
    debounceFunc () {
      this.debounce(this.handleWindowResize, null, 300)
    },
    handleWindowResize () {
      this.windowWidth = window.innerWidth
      this.setMinHeight()
    },
    handleAnimation () {
      this.$_fadeIn(this.$refs.title, 24, 0, 'top+=58', 0, 1.2)
      this.$_fadeIn(this.$refs.text, 24, 0, 'top+=58', 0, 1.2)
    },
    setMinHeight () {
      const footerHeight = document.querySelector('footer').clientHeight
      const navHeight = document.querySelector('.navigation__top').clientHeight
      this.elemMinHeight = window.innerHeight - (footerHeight + navHeight)
    }
  },
  transition: 'fade'
}
</script>

<style lang="sass" src="./index.sass"></style>
