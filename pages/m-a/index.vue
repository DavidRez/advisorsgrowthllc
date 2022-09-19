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
import CustomMABlocks from '~/components/custom/custom-m-a-blocks/custom-m-a-blocks'
import CustomMACapabilities from '~/components/custom/custom-m-a-capabilities/custom-m-a-capabilities'
import CustomMAWhatWeDo from '~/components/custom/custom-m-a-what-we-do/custom-m-a-what-we-do'
import CustomMACaseStudy from '~/components/custom/custom-m-a-case-study/custom-m-a-case-study'

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
    CustomMABlocks,
    CustomMACapabilities,
    CustomMAWhatWeDo,
    CustomMACaseStudy
  },
  async asyncData () {
    const data = await setData('m-a')
    return { props: data }
  },
  head () {
    return setMeta(this.props)
  },
  transition: 'fade'
}
</script>
