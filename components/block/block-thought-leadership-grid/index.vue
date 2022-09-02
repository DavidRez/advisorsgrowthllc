<template lang='pug' src='./index.pug'></template>

<script>
import axios from 'axios'
import { api } from '~/resources/api'

export default {
  props: {
    categories: {
      type: Array,
      default: () => ([])
    },
    posts: {
      type: Array,
      default: () => ([])
    },
    postType: {
      type: String,
      default: 'posts'
    },
    totalPages: {
      type: [String, Number],
      default: null
    }
  },
  data: () => ({
    componentKey: 0
  }),
  watch: {
    '$route.query' (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.filterPosts(this.$route.query.page)
      }
    }
  },
  methods: {
    filterPosts (page) {
      const apiStr = page ? `${api}/wp/v2/${this.postType}?per_page=12&page=${page}` : `${api}/wp/v2/${this.postType}?per_page=12`
      axios.get(apiStr).then((response) => {
        const blogs = response.data.reduce(
          (acc, item) => [
            ...acc,
            { title: item.title.rendered, link: '/' + item.slug, slug: item.slug, date: item.date, ...item.acf }
          ],
          []
        )
        this.$emit('update-blogs', blogs)
        this.$emit('update-total-pages', +response.headers['x-wp-totalpages'])
        this.componentKey++
        window.scrollTo({ top: this.$refs.main.offsetTop, behavior: 'smooth' })
      })
    },
    formatDate (dateCode) {
      const date = new Date(dateCode)
      const options = { month: 'long', day: 'numeric', year: 'numeric' }
      return date.toLocaleDateString(undefined, options)
    },
    replaceUrl (src) {
      if (src) {
        return src.replace('api.advisorgrowthllc.com', 'dld7fz6mejerl.cloudfront.net')
      }
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
