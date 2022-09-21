<template lang='pug' src='./custom-contact-section.pug'></template>

<script>
import { fadeIn, debounce } from '~/resources/mixins'

export default {
  mixins: [fadeIn, debounce],
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    global: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    elemMinHeight: 0,
    windowWidth: 0
  }),
  mounted () {
    this.handleResize()
    window.addEventListener('resize', this.debounceFunc)
    this.$nextTick(() => {
      if (!this.$store.state.siteLoaded) {
        this.$store.dispatch('VIEW_SITE', true)
      }
      this.handleAnimation()
    })

    const script1 = document.createElement('script')
    script1.innerHTML = `(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='MMERGE1';ftypes[1]='text';fnames[2]='MMERGE2';ftypes[2]='text';}(jQuery));var $mcj = jQuery.noConflict(true);`
    document.body.appendChild(script1)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceFunc)
  },
  methods: {
    debounceFunc () {
      this.debounce(this.handleResize, null, 300)
    },
    handleResize () {
      this.windowWidth = window.innerWidth
      this.setMinHeight()
    },
    setMinHeight () {
      const footerHeight = document.querySelector('footer').clientHeight
      const navHeight = document.querySelector('.navigation__top').clientHeight
      this.elemMinHeight = `${window.innerHeight - (footerHeight + navHeight)}px`
    },
    handleAnimation () {
      this.$nextTick(() => {
        if (this.props.header) {
          this.$_fadeIn(this.$refs.header, 24, 0, 'top+=58', 0, 1.2)
        }
        if (this.props.subheader) {
          this.$_fadeIn(this.$refs.subheader, 24, 0, 'top+=58', 0, 1.2)
        }
        if (this.props.has_address) {
          this.$_fadeIn(this.$refs.address, 24, 0, 'top+=58', 0, 1.2)
        }
      })
    }
  }
}
</script>

<style lang='sass' src='./custom-contact-section.sass'></style>
