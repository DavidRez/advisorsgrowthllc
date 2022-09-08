<template lang="pug" src="./index.pug"></template>

<script>
import axios from 'axios'
import { api } from '~/resources/api'
import { setMeta, setData } from '~/resources/utils'

export default {
  components: {},
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
