<template lang='pug' src='./navigation.pug'></template>

<script>
import { setData } from '../../resources/utils'
// import NavigationMobile from './navigation-mobile'
import router from '~/router/index'
import { bodyScroll, debounce, removeFocus } from '~/resources/mixins'

export default {
  components: {
  },
  mixins: [
    bodyScroll,
    debounce,
    removeFocus
  ],
  data: () => ({
    drawerOpen: false,
    dropdownActive: null,
    props: null,
    scrollDir: null,
    scrollPos: null,
    windowWidth: null
  }),
  computed: {
    links () {
      return router.filter((link) => {
        return link.navigation
      })
    }
  },
  async fetch () {
    this.props = await setData('global', 'globalData')
  },
  mounted () {
    this.handleResize()
    window.addEventListener('resize', this.debounceFunc)
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceFunc)
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    debounceFunc () {
      this.debounce(this.handleResize, null, 300)
    },
    handleResize () {
      this.windowWidth = window.innerWidth
      if (this.drawerOpen && this.windowWidth > 1024) {
        this.drawerOpen = false
        this.$_removeFocus()
        this.$_resetBodyScroll()
      }
    },
    handleScroll () {
      const currPos = window.pageYOffset
      currPos > this.scrollPos ? this.scrollDir = 'down' : this.scrollDir = 'up'
      this.scrollPos = currPos
    },
    openDropdown (i) {
      this.dropdownActive = i
    },
    closeDropdown () {
      this.dropdownActive = null
      this.$_removeFocus()
    },
    openDrawer () {
      this.drawerOpen = true
    }
  }
}
</script>

<style lang="sass" src="./navigation.sass"></style>
