<template lang="pug" src="./index.pug"></template>

<script>
import axios from 'axios'
import { api } from '~/resources/api'
import { setMeta, setData } from '~/resources/utils'

export default {
  components: {},
  async asyncData () {
    try {
      // Get All Insights Post Categories
      const categoriesResponse = await axios.get(`${api}/wp/v2/press-categories?per_page=100`)
      const categories = categoriesResponse.data.reduce(
        (acc, item) => {
          if (item.name !== 'Uncategorized' && item.name !== 'Featured') {
            return [
              ...acc,
              { id: item.id, name: item.name }
            ]
          } else {
            return acc
          }
        },
        []
      )
      // Get Featured Post
      const featCatID = categoriesResponse.data.find(cat => cat.name === 'Featured').id
      const featResponse = await axios.get(`${api}/wp/v2/press?press-categories=${featCatID}&filter[orderby]=date&order=desc`)
      let featPost = null
      if (featResponse.data.length > 0) {
        const recentFeatData = featResponse.data[0]
        featPost = {
          id: recentFeatData.id,
          title: recentFeatData.title.rendered,
          link: '/press/' + recentFeatData.slug,
          slug: recentFeatData.slug,
          date: recentFeatData.date,
          ...recentFeatData.acf
        }
      }
      // Get All Press Posts
      const apiStr = featPost ? `${api}/wp/v2/press?per_page=6&exclude=${featPost.id}` : `${api}/wp/v2/press?per_page=6`
      const response = await axios.get(apiStr)
      const totalPages = +response.headers['x-wp-totalpages']
      const press = response.data.reduce(
        (acc, item) => [
          ...acc,
          { title: item.title.rendered, link: '/press/' + item.slug, slug: item.slug, date: item.date, categories: item.categories, ...item.acf }
        ],
        []
      )
      const props = await setData('press')
      const global = await setData('global', 'globalData')
      return { press, categories, props, global, featPost, totalPages }
    } catch (e) {
      console.error('PRESS API: ' + e)
    }
  },
  mounted () {
    if (!this.$store.state.siteLoaded) {
      this.$store.dispatch('VIEW_SITE', true)
    }
  },
  head () {
    return setMeta(this.props)
  },
  transition: 'fade'
}
</script>
