<template lang='pug' src='./index.pug'></template>

<script>
import { setData, setMeta } from '~/resources/utils'
import BlockText from '~/components/block/block-text/block-text'

export default {
  components: {
    BlockText
  },
  async asyncData () {
    const data = await setData('privacy-policy')
    return { props: data }
  },
  head () {
    return setMeta(this.props)
  },
  transition: 'fade'
}
</script>
