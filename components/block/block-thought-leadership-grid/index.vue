<template lang='pug' src='./index.pug'></template>

<script>
import axios from 'axios'
import FilterDropdown from './filter-dropdown'
import FilterDropdownYears from './filter-dropdown-years'
import { api } from '~/resources/api'

export default {
  components: {
    FilterDropdown,
    FilterDropdownYears
  },
  props: {
    archiveID: {
      type: Number,
      default: null
    },
    categories: {
      type: Array,
      default: () => ([])
    },
    isArchive: {
      type: Boolean,
      default: false
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
    },
    years: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    activeCategory: 'All',
    activeYear: 'All',
    componentKey: 0,
    currPage: 1,
    pageArr: [],
    pageStart: 0,
    pageEnd: 0,
    showNextPages: false,
    showPrevPages: false,
    visiblePagination: [],
    yearKey: 0
  }),
  computed: {
    filteredCategories () {
      return this.categories.filter(cat => cat.name !== 'Archive' && cat.name !== 'Uncategorized')
    }
  },
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
    filterPosts (page, category, year) {
      let apiStr = page ? `${api}/wp/v2/${this.postType}?per_page=12&page=${page}` : `${api}/wp/v2/${this.postType}?per_page=12`

      if (this.postType === 'the-wire' && !this.isArchive) {
        apiStr += `&the-wire-archive-categories_exclude=${this.archiveID}`
      } else if (this.isArchive) {
        apiStr += `&the-wire-archive-categories=${this.archiveID}`
      }

      if (this.activeCategory !== 'All' || category) {
        this.activeCategory = category || this.activeCategory
        if (this.activeCategory !== 'All') {
          apiStr += this.postType === 'posts' ? `&categories=${this.activeCategory}&tax_relation=AND` : `&${this.postType}-categories=${this.activeCategory}&tax_relation=AND`
        }
        const getYears = async () => {
          const yearResponse = await axios.get(apiStr)
          const dataPages = yearResponse.headers['x-wp-totalpages']
          let blogArray = yearResponse.data
          for (let i = 2; i <= dataPages; i++) {
            const nextPage = await axios.get(
              `${apiStr}&page=${i}`
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
          this.yearKey++
          this.$emit('update-years', years)
        }
        getYears()
      }

      if (this.activeYear !== 'All' || year) {
        this.activeYear = year || this.activeYear
        if (this.activeYear !== 'All') {
          apiStr += `&after=${this.activeYear - 1}-12-31T23:59:59&before=${this.activeYear + 1}-01-01T00:00:00`
        }
      }

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
        if (page) {
          window.scrollTo({ top: this.$refs.main.offsetTop, behavior: 'smooth' })
        }
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
