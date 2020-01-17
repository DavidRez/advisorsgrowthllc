<template lang='pug' src='./about.pug'></template>

<script>
import api from '~/resources/api'

export default {
  components: {
  },
  async asyncData ({ $axios }) {
    try {
      const response = await $axios.$get(`${api}/wp/v2/pages`)
      const data = response.reduce(
        (allData, data) => ({
          ...allData,
          [data.slug]: {
            title: data.title.rendered,
            ...data.acf
          }
        }),
        {}
      )
      return { props: data.about }
    } catch (e) {
      console.error('About Page ' + e)
    }
  }
}
</script>
