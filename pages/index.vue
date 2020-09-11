<template lang="pug" src="./index.pug"></template>

<script>
import { postFetchHelper, setMeta } from '~/resources/utils'

export default {
  components: {},
  async asyncData () {
    const data = await postFetchHelper('home')
    return { content: data }
  },
  head () {
    return setMeta(this.content)
  }
}
</script>
