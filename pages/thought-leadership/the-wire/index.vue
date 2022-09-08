<template lang="pug" src="./index.pug"></template>

<script>
import axios from 'axios'
import { api } from '~/resources/api'
import { setMeta, setData } from '~/resources/utils'

export default {
  components: {},
  async asyncData ({query}) {
    try {
      // Get All Blog Post Categories
      const categoriesResponse = await axios.get(`${api}/wp/v2/the-wire-categories?per_page=100`)
      const categories = categoriesResponse.data.reduce(
        (acc, item) => [
          ...acc,
          { id: item.id, name: item.name }
        ],
        []
      )
      const categoriesArchiveResponse = await axios.get(`${api}/wp/v2/the-wire-archive-categories?per_page=100`)
      const categoriesArchive = categoriesArchiveResponse.data.reduce(
        (acc, item) => [
          ...acc,
          { id: item.id, name: item.name }
        ],
        []
      )
      // Get All Blog Posts
      const archiveID = categoriesArchive.find(cat => cat.name === 'Archive').id
      const apiStr = query.page ? `${api}/wp/v2/the-wire?per_page=12&page=${query.page}&the-wire-archive-categories_exclude=${archiveID}` : `${api}/wp/v2/the-wire?per_page=12&the-wire-archive-categories_exclude=${archiveID}`
      const response = await axios.get(apiStr)
      const totalPages = +response.headers['x-wp-totalpages']
      const blogs = response.data.reduce(
        (acc, item) => [
          ...acc,
          { title: item.title.rendered, link: '/' + item.slug, slug: item.slug, date: item.date, ...item.acf }
        ],
        []
      )
      const props = await setData('the-wire')
      return { blogs, categories, props, totalPages, archiveID }
    } catch (e) {
      console.error('The Wire: ' + e)
    }
  },
  head () {
    return setMeta(this.props)
  }
}
</script>
