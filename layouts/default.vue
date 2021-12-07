<template src='./default.pug' lang='pug'></template>

<script>
import SkipLink from '~/components/base/base-skip-link'
import TheFooter from '~/components/footer/footer'
import TheNavigation from '~/components/navigation/navigation'

export default {
  components: {
    SkipLink,
    TheFooter,
    TheNavigation
  }
}
</script>

<style>
  main:focus {
    outline: none;
  }
</style>
