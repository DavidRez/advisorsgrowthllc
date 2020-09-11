<template lang='pug' src='./about.pug'></template>

<script>
import { postFetchHelper, setMeta } from '~/resources/utils'

export default {
  components: {
  },
  async asyncData () {
    const data = await postFetchHelper('about')
    return { content: data }
  },
  head () {
    return setMeta(this.content)
  }
}
</script>
