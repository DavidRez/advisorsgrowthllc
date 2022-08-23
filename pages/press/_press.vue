<template lang="pug" src="./_press.pug"></template>

<script>
import axios from 'axios'
import { api } from '~/resources/api'
import { setData, setMeta } from '~/resources/utils'

export default {
  components: {
  },
  async asyncData ({ params }) {
    try {
      // Get All Posts
      const allBlogsResponse = await axios.get(`${api}/wp/v2/press?per_page=100`)
      const dataPages = allBlogsResponse.headers['x-wp-totalpages']
      let blogArray = allBlogsResponse.data
      let nextPostLink
      for (let i = 2; i <= dataPages; i++) {
        const nextPage = await axios.get(
          `${api}/wp/v2/press?per_page=100&page=${i}`
        )
        blogArray = [...blogArray, ...nextPage.data]
      }
      // Get current blog post props
      const currPost = blogArray.find(blog => blog.slug === params.press)
      const props = {
        id: currPost.id,
        title: currPost.title.rendered,
        slug: currPost.slug,
        date: currPost.date,
        categories: currPost.categories,
        ...currPost.acf
      }
      const currPostIndex = blogArray.findIndex(blog => blog.id === props.id)
      // Get Next post link
      if (blogArray[currPostIndex + 1]) {
        nextPostLink = '/press/' + blogArray[currPostIndex + 1].slug
      } else {
        nextPostLink = '/press/' + blogArray[0].slug
      }
      const global = await setData('global', 'globalData')
      return { props, global, nextPostLink }
    } catch (e) {
      console.error(`${params.press} page: ${e}`)
    }
  },
  head () {
    return setMeta(this.props)
  },
  transition: 'fade'
}
</script>
