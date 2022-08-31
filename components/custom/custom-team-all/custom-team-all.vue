<template lang='pug' src='./custom-team-all.pug'></template>

<script>
import { fadeIn } from '~/resources/mixins'

export default {
  mixins: [fadeIn],
  props: {
    categories: {
      type: Array,
      default: () => ([])
    },
    props: {
      type: Object,
      default: () => ({})
    },
    team: {
      type: Array,
      default: () => ([])
    },
    windowWidth: {
      type: Number,
      default: 0
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
      return this.team.filter(member => member.categories.includes(id))
    },
    replaceImgSrc (image) {
      return image ? image.url.replace('api.advisorgrowthllc.com', 'dld7fz6mejerl.cloudfront.net') : null
    },
    handleAnimation () {
      this.$refs.members.forEach((member, i) => {
        this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
        const membertl = this.$gsap.timeline({
          scrollTrigger: {
            trigger: member.$el,
            start: '+48 bottom'
          }
        })
        const delay = 0.1 + (0.1 * i)
        membertl.from(member.$el, {
          opacity: 0,
          y: '32',
          delay,
          duration: 0.8,
          ease: 'customEaseOut'
        })
      })
    }
  }
}
</script>

<style lang='sass' src='./custom-team-all.sass'></style>
