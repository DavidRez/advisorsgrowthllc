<template lang="pug" src="./hero-pages.pug"></template>

<script>
import { debounce } from '~/resources/mixins'

export default {
  mixins: [debounce],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    imgSrc: null,
    imgWebp: null,
    bgSrc: null,
    bgWebp: null,
    windowWidth: null,
    navHeight: 0
  }),
  mounted () {
    this.loadImage()
    window.addEventListener('resize', this.debounceFunc)
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
      this.windowWidth > 600 ? this.bgSrc = this.props.background.src : this.bgSrc = this.props.background_mobile.src
      this.windowWidth > 600 ? this.bgWebp = this.props.background.webp : this.bgWebp = this.props.background_mobile.webp
      this.windowWidth > 600 ? this.imgSrc = this.props.image.src : this.imgSrc = this.props.image_mobile.src
      this.windowWidth > 600 ? this.imgWebp = this.props.image.webp : this.imgWebp = this.props.image_mobile.webp
      this.getNavHeight()
    },
    loadImage () {
      this.handleResize()
      this.$nextTick(() => {
        this.$refs.image.children[1].onload = () => {
          if (!this.$store.state.siteLoaded) {
            this.$store.dispatch('VIEW_SITE', true)
          }
          this.handleAnimation()
        }
      })
    },
    getNavHeight () {
      this.$nextTick(() => {
        const navHeight = document.querySelector('.navigation__top').clientHeight
        this.navHeight = `${navHeight}px`
      })
    },
    handleAnimation () {
      this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
      const tl = this.$gsap.timeline()
      const bg = this.$refs.bg
      const mainImage = this.$refs.mainImage
      const title = this.$refs.title
      const body = this.$refs.body
      const stripe = this.$refs.stripe
      tl.from(bg, {
        opacity: 0,
        duration: 1,
        ease: 'customEaseOut'
      }, '<+=0.175')
      tl.from(title, {
        x: -24,
        opacity: 0,
        duration: 1,
        ease: 'customEaseOut'
      }, '<+=0.25')
      tl.from(body, {
        x: -24,
        opacity: 0,
        duration: 1,
        ease: 'customEaseOut'
      }, '<+=0.175')
      tl.from(mainImage, {
        x: -54,
        y: 54,
        opacity: 0,
        duration: 1,
        ease: 'customEaseOut'
      }, '<+=0.175')
      tl.from(stripe, {
        x: 400,
        y: -400,
        opacity: 0.5,
        duration: 0.25,
        ease: 'customEaseOut'
      }, '<+=0.175')
    }
  }
}
</script>

<style lang="sass" src="./hero-pages.sass"></style>
