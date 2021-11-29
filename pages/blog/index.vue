<template lang="pug" src="./index.pug"></template>

<script>
import axios from 'axios'
import { api } from '~/resources/api'
import { setMeta, setData } from '~/resources/utils'

export default {
  components: {},
  async asyncData () {
    try {
      // Get All Blog Posts
      const response = await axios.get(`${api}/wp/v2/posts?per_page=100`)
      const dataPages = response.headers['x-wp-totalpages']
      let blogArray = response.data
      for (let i = 2; i <= dataPages; i++) {
        const nextPage = await axios.get(
          `${api}/wp/v2/posts?per_page=100&page=${i}`
        )
        blogArray = [...blogArray, ...nextPage.data]
      }
      const blogs = blogArray.reduce(
        (acc, item) => [
          ...acc,
          { link: '/' + item.slug, slug: item.slug, ...item.acf }
        ],
        []
      )
      const props = await setData('blog')
      return { blogs, props }
    } catch (e) {
      console.error('BLOG API: ' + e)
    }
  },
  head () {
    return setMeta(this.props)
  }
}
</script>
