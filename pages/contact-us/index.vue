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
    return { props: data }
  },
  mounted () {
    this.getNavHeight()
    window.addEventListener('resize', this.debounceFunc)
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
        const loaderHeight = document.querySelector('.base-loader').clientHeight
        this.margin = `${navHeight - loaderHeight}px`
      })
    }
  }
}
</script>
