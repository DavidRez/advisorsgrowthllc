<template lang='pug'>
  div
    TheNavigation
    nuxt
</template>

<script>
import TheNavigation from '~/components/the-navigation/the-navigation'

export default {
  components: {
    TheNavigation,
  },
}
</script>

<style lang='sass'>
@import "~/styles/base/normalize.sass"
@import "~/styles/base/fonts.sass"
@import "~/styles/base/typography.sass"
</style>
