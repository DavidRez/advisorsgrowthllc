<template lang="pug" src="./index.pug"></template>

<script>
import axios from 'axios'
import { api } from '~/resources/api'
import { setMeta, setData } from '~/resources/utils'
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
import CustomTeamAll from '~/components/custom/custom-team-all/custom-team-all'

export default {
  transition: 'fade',
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
    CustomTeamAll
  },
  mixins: [debounce],
  data: () => ({
    windowWidth: 0
  }),
  async asyncData () {
    try {
      // Get All Careers Posts
      const response = await axios.get(`${api}/wp/v2/careers?per_page=100`)
      const dataPages = response.headers['x-wp-totalpages']
      let careersArray = response.data
      for (let i = 2; i <= dataPages; i++) {
        const nextPage = await axios.get(
          `${api}/wp/v2/careers?per_page=100&page=${i}`
        )
        careersArray = [...careersArray, ...nextPage.data]
      }
      const careers = careersArray.reduce(
        (acc, item) => [
          ...acc,
          { name: item.title.rendered, link: '/careers/' + item.slug, date: item.date_gmt, slug: item.slug, ...item.acf }
        ],
        []
      )
      const sortedTeam = careers.sort((a, b) => {
        const aDate = new Date(a.date)
        const bDate = new Date(b.date)
        return aDate - bDate
      })

      const props = await setData('careers')
      return { sortedTeam, props }
    } catch (e) {
      console.error('careers API: ' + e)
    }
  },
  mounted () {
    this.handleScreenResize()
    window.addEventListener('resize', this.debounceFunc)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceFunc)
  },
  methods: {
    debounceFunc () {
      this.debounce(this.handleScreenResize, null, 300)
    },
    handleScreenResize () {
      this.windowWidth = window.innerWidth
    }
  },
  head () {
    return setMeta(this.props)
  }
}
</script>
