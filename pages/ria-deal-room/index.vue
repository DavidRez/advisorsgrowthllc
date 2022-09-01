<template lang='pug' src='./index.pug'></template>

<script>
import axios from 'axios'
import { api } from '~/resources/api'
import { setData, setMeta } from '~/resources/utils'

export default {
  components: {
  },
  async asyncData () {
    try {
      const props = await setData('ria-deal-room')

      // Get Webinars
      const response = await axios.get(`${api}/wp/v2/webinars?per_page=${props.total_webinars}`)
      const webinarArray = response.data

      const webinars = webinarArray.reduce(
        (acc, item) => [
          ...acc,
          { name: item.title.rendered, link: '/webinars/' + item.slug, date: item.date_gmt, slug: item.slug, ...item.acf }
        ],
        []
      )

      return { webinars, props }
    } catch (e) {
      console.error('RIA DEAL ROOM API: ' + e)
    }
  },
  head () {
    return setMeta(this.props)
  }
}
</script>
