<template lang="pug" src="./index.pug"></template>

<script>
// import axios from 'axios'
// import { api } from '~/resources/api'
import { setMeta, setData } from '~/resources/utils'
import { debounce } from '~/resources/mixins'

export default {
  transition: 'fade',
  components: {},
  mixins: [debounce],
  data: () => ({
    windowWidth: 0
  }),
  async asyncData () {
    try {
      // // Get All Team Post Categories
      // const categoriesResponse = await axios.get(`${api}/wp/v2/team-categories?per_page=100`)
      // const categories = categoriesResponse.data.reduce(
      //   (acc, item) => [
      //     ...acc,
      //     { id: item.id, name: item.name }
      //   ],
      //   []
      // )
      // // Get All Team Posts
      // const response = await axios.get(`${api}/wp/v2/team?per_page=100`)
      // const dataPages = response.headers['x-wp-totalpages']
      // let teamArray = response.data
      // for (let i = 2; i <= dataPages; i++) {
      //   const nextPage = await axios.get(
      //     `${api}/wp/v2/team?per_page=100&page=${i}`
      //   )
      //   teamArray = [...teamArray, ...nextPage.data]
      // }
      // const team = teamArray.reduce(
      //   (acc, item) => [
      //     ...acc,
      //     { name: item.title.rendered, link: '/team/' + item.slug, slug: item.slug, categories: item['team-categories'], ...item.acf }
      //   ],
      //   []
      // )
      const props = await setData('team')
      const global = await setData('global', 'globalData')
      return { props, global }
      // return { team, categories, props, global }
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
