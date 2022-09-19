<template lang='pug' src='./index.pug'></template>

<script>
import axios from 'axios'
import { api } from '~/resources/api'
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
import CustomRiaWebinar from '~/components/custom/custom-ria-webinar/custom-ria-webinar'

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
    CustomRiaWebinar
  },
  async asyncData () {
    try {
      const props = await setData('ria-deal-room')

      // Get All AGS Studies Categories
      const categoriesResponse = await axios.get(`${api}/wp/v2/categories?per_page=100`)
      const categories = categoriesResponse.data.reduce(
        (acc, item) => [
          ...acc,
          { id: item.id, name: item.name }
        ],
        []
      )

      // Get RIA Reports
      const category = categories.find((cat) => {
        return cat.name === 'RIA Deal Room Report'
      })

      const reportsResponse = await axios.get(`${api}/wp/v2/posts?categories=${category.id}&per_page=100`)

      let recentId = props.page_sections.find((section) => {
        return section.acf_fc_layout === 'custom_ria_report'
      })
      recentId = recentId.report.ID

      const reportsArray = reportsResponse.data
      const recent = []
      const previous = []

      reportsArray.forEach((item, i) => {
        const curr = { label: item.title.rendered, href: item.acf.custom_post.link.file.url.replace('api.advisorgrowthllc.com', 'dld7fz6mejerl.cloudfront.net'), external: true }
        if (item.id === recentId) {
          recent.push(curr)
        } else {
          previous.push(curr)
        }
      })

      // Get Webinars
      const webinarResponse = await axios.get(`${api}/wp/v2/webinars?per_page=${props.total_webinars}`)
      const webinarArray = webinarResponse.data

      const webinars = webinarArray.reduce(
        (acc, item) => [
          ...acc,
          { name: item.title.rendered, link: '/webinars/' + item.slug, date: item.date_gmt, slug: item.slug, ...item.acf }
        ],
        []
      )

      return { webinars, props, recent, previous }
    } catch (e) {
      console.error('RIA DEAL ROOM API: ' + e)
    }
  },
  methods: {
    replaceImgSrc (url) {
      return url ? url.replace('api.advisorgrowthllc.com', 'dld7fz6mejerl.cloudfront.net') : null
    }
  },
  head () {
    return setMeta(this.props)
  },
  transition: 'fade'
}
</script>
