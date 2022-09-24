<template lang="pug">
  .pages-404
    .pages-404__container
      h1.pages-404__title(ref='title') Page Not Found
      .pages-404__col(ref='text')
        nuxt-link.pages-404__button(to='/') Go to Home page.
</template>

<script>
import { fadeIn } from '~/resources/mixins'

export default {
  components: {},
  mixins: [
    fadeIn
  ],
  data: () => ({
    elemMinHeight: 0,
    windowWidth: 0
  }),
  mounted () {
    this.$store.dispatch('VIEW_SITE', true)
    this.handleAnimation()
  },
  methods: {
    handleAnimation () {
      this.$_fadeIn(this.$refs.title, 24, 0, 'top+=58', 0, 1.2)
      this.$_fadeIn(this.$refs.text, 24, 0, 'top+=58', 0, 1.2)
    }
  },
  transition: 'fade'
}
</script>

<style lang="sass" src="./index.sass"></style>
