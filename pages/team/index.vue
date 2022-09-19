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
      // Get All Team Post Categories
      const categoriesResponse = await axios.get(`${api}/wp/v2/team-categories?per_page=100`)
      const categories = categoriesResponse.data.reduce(
        (acc, item) => [
          ...acc,
          { id: item.id, name: item.name }
        ],
        []
      )
      // Get All Team Posts
      const response = await axios.get(`${api}/wp/v2/team?per_page=100`)
      const dataPages = response.headers['x-wp-totalpages']
      let teamArray = response.data
      for (let i = 2; i <= dataPages; i++) {
        const nextPage = await axios.get(
          `${api}/wp/v2/team?per_page=100&page=${i}`
        )
        teamArray = [...teamArray, ...nextPage.data]
      }
      const team = teamArray.reduce(
        (acc, item) => [
          ...acc,
          { name: item.title.rendered, link: '/team/' + item.slug, date: item.date_gmt, slug: item.slug, categories: item['team-categories'], ...item.acf }
        ],
        []
      )
      const sortedTeam = team.sort((a, b) => {
        const aDate = new Date(a.date)
        const bDate = new Date(b.date)
        return aDate - bDate
      })

      const props = await setData('team')
      const global = await setData('global', 'globalData')
      return { sortedTeam, categories, props, global }
    } catch (e) {
      console.error('TEAM API: ' + e)
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
