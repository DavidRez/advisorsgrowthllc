<template lang="pug" src="./footer-desktop.pug"></template>

<script>

export default {
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    links: {
      type: Array,
      default: () => ([])
    },
    top: {
      type: Function,
      default: () => ({})
    }
  },
  data: () => ({
    email: ''
  }),
  methods: {
    removeClass () {
      setTimeout(() => {
        document.getElementById('mce-EMAIL').classList.remove('mce_inline_error')
      }, 500)
    }
  }
}
</script>

<style lang="sass" src="./footer-desktop.sass"></style>
