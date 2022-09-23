<template lang="pug" src="./_careers.pug"></template>

<script>
import { setData, setMeta } from '~/resources/utils'
import HeroPagesSmall from '~/components/hero/hero-pages-small/hero-pages-small'
import CustomCareerPost from '~/components/custom/custom-career-post/custom-career-post'
import FormApply from '~/components/form/form-apply'

export default {
  components: {
    HeroPagesSmall,
    CustomCareerPost,
    FormApply
  },
  async asyncData ({ params }) {
    const data = await setData(params.careers, 'careers')
    return { props: data }
  },
  head () {
    return setMeta(this.props)
  },
  transition: 'fade'
}
</script>
