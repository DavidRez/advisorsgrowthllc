<template lang="pug" src="./_blogs.pug"></template>

<script>
import { postFetchHelper, setMeta } from '../resources/utils'

export default {
  components: {
  },
  async asyncData ({ params }) {
    const data = await postFetchHelper(params.blogs, 'posts')
    return { content: data }
  },
  head () {
    return setMeta(this.content)
  }
}
</script>
