<template lang='pug' src='./index.pug'></template>

<script>
import { setData, setMeta } from '~/resources/utils'

export default {
  components: {
  },
  async asyncData () {
    const data = await setData('ria-deal-room')
    return { props: data }
  },
  head () {
    return setMeta(this.props)
  }
}
</script>
