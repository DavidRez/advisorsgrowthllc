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
    componentKey: 0,
    currPage: 1,
    pageArr: [],
    pageStart: 0,
    pageEnd: 0,
    showNextPages: false,
    showPrevPages: false,
    visiblePagination: []
  }),
  watch: {
    '$route.query' (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.currPage = this.$route.query.page
        this.filterPosts(this.$route.query.page)
      }
    }
  },
  mounted () {
    this.pageArr = Array.from(Array(this.totalPages), (_, i) => 1 + i)
    if (this.$route.query.page) {
      this.currPage = +this.$route.query.page
      this.pageStart = this.currPage - 1
      this.pageEnd = this.pageArr.length - this.pageStart < 6 ? this.pageArr.length : this.pageStart + 6
    } else {
      this.pageEnd = this.pageArr.length >= 6 ? this.pageStart + 6 : this.pageArr.length
    }
    this.handlePagination()
  },
  methods: {
    filterPosts (page) {
      const apiStr = page ? `${api}/wp/v2/${this.postType}?per_page=6&page=${page}` : `${api}/wp/v2/${this.postType}?per_page=6`
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
        this.currPage = +page
        this.pageArr = Array.from(Array(this.totalPages), (_, i) => 1 + i)
        this.pageEnd = this.pageArr.length >= 6 ? this.pageStart + 6 : this.pageArr.length
        this.handlePagination()
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
    },
    handlePagination () {
      if (this.pageEnd < this.pageArr.length) {
        this.showNextPages = true
      } else {
        this.showNextPages = false
      }
      if (this.pageStart > 0) {
        this.showPrevPages = true
      } else {
        this.showPrevPages = false
      }
      this.visiblePagination = this.pageArr.slice(this.pageStart, this.pageEnd)
    },
    incrementPagination () {
      if (this.pageEnd + 5 > this.pageArr.length) {
        const increaseBy = 5 - ((this.pageEnd + 1) - this.pageArr.length)
        this.pageStart += increaseBy
        this.pageEnd += increaseBy
      } else {
        this.pageStart += 5
        this.pageEnd += 5
      }
      this.handlePagination()
    },
    decrementPagination () {
      if (this.pageStart - 5 < 0) {
        this.pageStart = 0
        this.pageEnd = 6
      } else {
        this.pageStart -= 5
        this.pageEnd -= 5
      }
      this.handlePagination()
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
