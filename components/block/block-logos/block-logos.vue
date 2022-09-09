<template lang='pug' src='./block-logos.pug'></template>

<script>
import { fadeIn } from '~/resources/mixins'

export default {
  mixins: [fadeIn],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
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
    filterTeam (id) {
      return this.team.filter(logo => logo.categories.includes(id))
    },
    replaceImgSrc (image) {
      return image ? image.url.replace('api.advisorgrowthllc.com', 'dld7fz6mejerl.cloudfront.net') : null
    },
    handleAnimation () {
      this.$nextTick(() => {
        this.$refs.logos.forEach((logo, i) => {
          this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
          const logotl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: logo.$el,
              start: '+48 bottom'
            }
          })
          const delay = 0.1 + (0.1 * i)
          logotl.from(logo.$el, {
            opacity: 0,
            y: '32',
            delay,
            duration: 1.5,
            ease: 'customEaseOut'
          })
        })
      })
    }
  }
}
</script>

<style lang='sass' src='./block-logos.sass'></style>
