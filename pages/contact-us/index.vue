<template lang="pug" src="./index.pug"></template>

<script>
import { setData } from '~/resources/utils'
import { debounce } from '~/resources/mixins'

export default {
  components: {},
  mixins: [debounce],
  data: () => ({
    margin: 0
  }),
  async asyncData () {
    const data = await setData('contact-us')
    const globalData = await setData('global', 'globalData')
    return { props: data, global: globalData }
  },
  mounted () {
    this.getNavHeight()
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
      this.getNavHeight()
    },
    getNavHeight () {
      this.$nextTick(() => {
        const navHeight = document.querySelector('.navigation__top').clientHeight
        this.margin = `${navHeight}px`
      })
    }
  }
}
</script>
