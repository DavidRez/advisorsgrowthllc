<template lang='pug' src='./index.pug'></template>

<script>
import { setData, setMeta } from '~/resources/utils'
import BlockText from '~/components/block/block-text/block-text'
import { debounce, fadeIn } from '~/resources/mixins'

export default {
  components: {
    BlockText
  },
  mixins: [
    debounce,
    fadeIn
  ],
  data: () => ({
    elemMinHeight: 0,
    windowWidth: 0
  }),
  async asyncData () {
    const data = await setData('thank-you')
    return { props: data }
  },
  mounted () {
    this.handleWindowResize()
    window.addEventListener('resize', this.debounceFunc)
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
    setMinHeight () {
      const footerHeight = document.querySelector('footer').clientHeight
      const navHeight = document.querySelector('.navigation__top').clientHeight
      this.elemMinHeight = window.innerHeight - (footerHeight + navHeight)
    }
  },
  head () {
    return setMeta(this.props)
  },
  transition: 'fade'
}
</script>
