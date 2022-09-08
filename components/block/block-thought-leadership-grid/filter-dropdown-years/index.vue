<template lang='pug' src='./index.pug'></template>

<script>
export default {
  props: {
    activeCategory: {
      type: [Number, String],
      default: 'All'
    },
    categories: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    dropdownActive: false
  }),
  methods: {
    filterPosts (id) {
      this.$emit('filter-posts', id)
      this.dropdownActive = false
    },
    showActiveFilter () {
      if (this.activeCategory === 'All') {
        return 'All'
      } else {
        return this.categories.find(cat => cat.id === this.activeCategory).name
      }
    },
    toggleFilterMenu () {
      this.dropdownActive = !this.dropdownActive
    }
  }
}
</script>

<style lang='sass' src='./index.sass'></style>
