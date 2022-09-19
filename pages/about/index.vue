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
import CustomAboutAdvantage from '~/components/custom/custom-about-advantage/custom-about-advantage'
import CustomAboutData from '~/components/custom/custom-about-data/custom-about-data'
import CustomAboutProcess from '~/components/custom/custom-about-process/custom-about-process'

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
    CustomAboutAdvantage,
    CustomAboutData,
    CustomAboutProcess
  },
  async asyncData () {
    const data = await setData('about')
    return { props: data }
  },
  head () {
    return setMeta(this.props)
  },
  transition: 'fade'
}
</script>
