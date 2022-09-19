<template lang="pug" src="./index.pug"></template>

<script>
import { setData } from '~/resources/utils'
import { debounce } from '~/resources/mixins'
import HeroHome from '~/components/hero/hero-home/hero-home'
import HeroPages from '~/components/hero/hero-pages/hero-pages'
import HeroPagesSmall from '~/components/hero/hero-pages-small/hero-pages-small'
import BlockContent from '~/components/block/block-content/block-content'
import BlockLinks from '~/components/block/block-links/block-links'
import BlockLogos from '~/components/block/block-logos/block-logos'
import BlockSeparator from '~/components/block/block-separator/block-separator'
import BlockStackedLinks from '~/components/block/block-stacked-links/block-stacked-links'
import BlockText from '~/components/block/block-text/block-text'
import CustomContactSection from '~/components/custom/custom-contact-section/custom-contact-section'

export default {
  components: {
    HeroHome,
    HeroPages,
    HeroPagesSmall,
    BlockContent,
    BlockLinks,
    BlockLogos,
    BlockSeparator,
    BlockStackedLinks,
    BlockText,
    CustomContactSection
  },
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
  },
  transition: 'fade'
}
</script>
