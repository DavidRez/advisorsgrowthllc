<template lang="pug" src="./index.pug"></template>

<script>
import axios from 'axios'
import { api } from '~/resources/api'
import { setMeta, setData } from '~/resources/utils'
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
  async asyncData ({query}) {
    try {
      // Get All Blog Posts
      const apiStr = query.page ? `${api}/wp/v2/videos?per_page=6&page=${query.page}` : `${api}/wp/v2/videos?per_page=6`
      const response = await axios.get(apiStr)
      const totalPages = +response.headers['x-wp-totalpages']
      const blogs = response.data.reduce(
        (acc, item) => [
          ...acc,
          { title: item.title.rendered, link: '/' + item.slug, slug: item.slug, ...item.acf }
        ],
        []
      )
      const props = await setData('videos')
      return { blogs, props, totalPages }
    } catch (e) {
      console.error('Videos: ' + e)
    }
  },
  head () {
    return setMeta(this.props)
  }
}
</script>
