<template lang="pug" src="./_team.pug"></template>

<script>
import { setData, setMeta } from '~/resources/utils'
import HeroPages from '~/components/hero/hero-pages/hero-pages'
import CustomTeamMember from '~/components/custom/custom-team-member/custom-team-member'

export default {
  components: {
    HeroPages,
    CustomTeamMember
  },
  async asyncData ({ params }) {
    const data = await setData(params.team, 'team')
    return { props: data }
  },
  head () {
    return setMeta(this.props)
  },
  transition: 'fade'
}
</script>
