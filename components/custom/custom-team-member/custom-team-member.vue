<template lang='pug' src='./custom-team-member.pug'></template>

<script>
import { fadeIn } from '~/resources/mixins'

export default {
  mixins: [
    fadeIn
  ],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {
    this.$store.dispatch('VIEW_SITE', true)
    this.$nextTick(() => {
      this.handleAnimation()
    })
  },
  methods: {
    replaceSrc (src) {
      if (src) {
        return src.replace('api.advisorgrowthllc.com', 'dld7fz6mejerl.cloudfront.net')
      }
    },
    handleAnimation () {
      this.$_fadeIn(this.$refs.name, 0, -24, 'center', 0, 1.4)
      this.$_fadeIn(this.$refs.position, 0, 24, 'center', 0.25, 1.4)
      this.$_fadeIn(this.$refs.bio, 0, 24, 'center', 0.25, 1.4)
      this.$_fadeIn(this.$refs.image, 0, -32, 'center', 0.5, 1.4)
      this.$_fadeIn(this.$refs.back.$el, 0, -24, 'top+=58', 0.25, 1.2)
      if (this.props.social_links) {
        this.$_fadeIn(this.$refs.links, 32, 0, 'top bottom', 0.5, 1.4)
      }
      if (this.props.next_team_member) {
        this.$_fadeIn(this.$refs.forward.$el, 0, 24, 'top+=58', 0.25, 1.2)
      }
    }
  }
}
</script>

<style lang='sass' src='./custom-team-member.sass'></style>
