<template lang='pug' src='./index.pug'></template>

<script>
import { setData, setMeta } from '~/resources/utils'
import HeroHome from '~/components/hero/hero-home/hero-home'
import HeroPages from '~/components/hero/hero-pages/hero-pages'
import HeroPagesSmall from '~/components/hero/hero-pages-small/hero-pages-small'
import BlockContent from '~/components/block/block-content/block-content'
import BlockLinks from '~/components/block/block-links/block-links'
import BlockLogos from '~/components/block/block-logos/block-logos'
import BlockSeparator from '~/components/block/block-separator/block-separator'
import BlockStackedLinks from '~/components/block/block-stacked-links/block-stacked-links'
import BlockText from '~/components/block/block-text/block-text'
import CustomTestimonials from '~/components/custom/custom-testimonials/custom-testimonials'

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
    CustomTestimonials
  },
  async asyncData () {
    const data = await setData('testimonials')
    return { props: data }
  },
  head () {
    return setMeta(this.props)
  },
  transition: 'fade'
}
</script>
