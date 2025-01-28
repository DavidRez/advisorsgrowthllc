<template lang="pug" src="./footer.pug"></template>

<script>
import { setData } from '../../resources/utils'
import { fadeIn, debounce } from '~/resources/mixins'
import footer from '~/router/footer'

export default {
  mixins: [fadeIn, debounce],
  data: () => ({
    props: null,
    windowWidth: 0
  }),
  computed: {
    links () {
      return footer.filter((link) => {
        return link.navigation
      })
    }
  },
  async fetch () {
    this.props = await setData('global', 'globalData')
  },
  mounted () {
    this.handleWindowResize()
    window.addEventListener('resize', this.debounceFunc)

    const script1 = document.createElement('script')
    script1.setAttribute('src', '')
    document.body.appendChild(script1)
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
    },
    top () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style lang="sass" src="./footer.sass"></style>
