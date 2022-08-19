<template lang='pug' src='./custom-home-stats.pug'></template>

<script>
import { fadeIn, parallax } from '~/resources/mixins'

export default {
  mixins: [fadeIn, parallax],
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    dataValues () {
      return this.props.data.map(item => ({ value: 0, target: item.target_number, label: item.label }))
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
    handleAnimation () {
      this.$_fadeIn(this.$refs.content, 0, 0, 'top+=58', 0, 0.6)
      this.$nextTick(() => {
        this.$refs.stats.forEach((stat) => {
          const tl = this.$gsap.timeline({
            scrollTrigger: {
              trigger: stat,
              start: 'top+=48 bottom'
            }
          })
          this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')
          tl.from(stat, {
            y: 24,
            opacity: 0,
            duration: 1.2,
            ease: 'customEaseOut'
          })
        })
      })
      this.$nextTick(() => {
        this.$refs.numbersFirst.forEach((item, i) => {
          const target = +item.dataset.target
          this.$ScrollTrigger.create({
            trigger: item,
            start: 'bottom bottom',
            onEnter: () => {
              this.$gsap.to(item, {
                innerText: target,
                snap: {
                  innerText: 1
                },
                modifiers: {
                  innerText: value => value.toFixed(0)
                },
                duration: 1.5
              })
            }
          })
        })
      })
      this.$nextTick(() => {
        this.$refs.numbersSecond.forEach((item, i) => {
          const target = +item.dataset.target
          this.$ScrollTrigger.create({
            trigger: item,
            start: 'bottom bottom',
            onEnter: () => {
              this.$gsap.to(item, {
                innerText: target,
                snap: {
                  innerText: 1
                },
                modifiers: {
                  innerText: value => value.toFixed(0)
                },
                duration: 1.5
              })
            }
          })
        })
      })
    }
  }
}
</script>

<style lang='sass' src='./custom-home-stats.sass'></style>
