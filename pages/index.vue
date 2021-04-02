<template lang="pug" src="./index.pug"></template>

<script>
import { setData } from '~/resources/utils'

export default {
  components: {},
  async asyncData () {
    const data = await setData('home')
    return { props: data }
  }
}
</script>
