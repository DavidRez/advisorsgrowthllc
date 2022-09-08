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
      const archiveID = categoriesArchive.find(cat => cat.name === 'Archive').id
      // Get All Archive Post Years
      const yearResponse = await axios.get(`${api}/wp/v2/the-wire?per_page=100&the-wire-archive-categories=${archiveID}`)
      const dataPages = yearResponse.headers['x-wp-totalpages']
      let blogArray = yearResponse.data
      for (let i = 2; i <= dataPages; i++) {
        const nextPage = await axios.get(
          `${api}/wp/v2/the-wire?per_page=100&the-wire-archive-categories=${archiveID}&page=${i}`
        )
        blogArray = [...blogArray, ...nextPage.data]
      }
      const years = blogArray.reduce(
        (acc, item) => {
          const d = new Date(item.date)
          const itemYear = d.getFullYear()
          if (!acc.includes(itemYear)) {
            return [
              ...acc,
              itemYear
            ]
          } else {
            return acc
          }
        },
        []
      )
      // Get All Blog Posts
      const apiStr = query.page ? `${api}/wp/v2/the-wire?per_page=12&page=${query.page}&the-wire-archive-categories=${archiveID}` : `${api}/wp/v2/the-wire?per_page=12&the-wire-archive-categories=${archiveID}`
      const response = await axios.get(apiStr)
      const totalPages = +response.headers['x-wp-totalpages']
      const blogs = response.data.reduce(
        (acc, item) => [
          ...acc,
          { title: item.title.rendered, link: '/' + item.slug, slug: item.slug, date: item.date, ...item.acf }
        ],
        []
      )
      const props = await setData('article-archives')
      return { blogs, categories, props, totalPages, years, archiveID }
    } catch (e) {
      console.error('The Wire: ' + e)
    }
  },
  head () {
    return setMeta(this.props)
  }
}
</script>
