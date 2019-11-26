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
  @import "~/styles/extensions/normalize.sass"
  @import "~/styles/extensions/typography.sass"
  @import "~/styles/extensions/buttons.sass"
  @import "~/styles/extensions/global-extensions.sass"
  @import "~/styles/extensions/transitions.sass"
</style>
