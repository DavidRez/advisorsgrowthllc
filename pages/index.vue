<template lang="pug" src="./index.pug"></template>

<script>
import { setData } from '~/resources/utils'
import HeroHome from '~/components/hero/hero-home/hero-home'
import HeroPages from '~/components/hero/hero-pages/hero-pages'
import HeroPagesSmall from '~/components/hero/hero-pages-small/hero-pages-small'
import BlockContent from '~/components/block/block-content/block-content'
import BlockLinks from '~/components/block/block-links/block-links'
import BlockLogos from '~/components/block/block-logos/block-logos'
import BlockSeparator from '~/components/block/block-separator/block-separator'
import BlockStackedLinks from '~/components/block/block-stacked-links/block-stacked-links'
import BlockText from '~/components/block/block-text/block-text'
import CustomHomeStats from '~/components/custom/custom-home-stats/custom-home-stats'
import CustomHomeFuture from '~/components/custom/custom-home-future/custom-home-future'
import CustomHomeWhatWeDo from '~/components/custom/custom-home-what-we-do/custom-home-what-we-do'
import CustomHomeReportFeature from '~/components/custom/custom-home-report-feature/custom-home-report-feature'
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
    CustomHomeStats,
    CustomHomeFuture,
    CustomHomeWhatWeDo,
    CustomHomeReportFeature,
    CustomContactSection
  },
  async asyncData () {
    const data = await setData('home')
    return { props: data }
  },
  transition: 'fade'
}
</script>
