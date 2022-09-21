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
  },
  watch: {
    $route: 'onRouteChange'
  },
  methods: {
    onRouteChange () {
      const target = document.querySelector('#page-wrapper')
      console.log('change', target)
      target.focus()

      document.getElementById('mce-success-response').innerHTML = ''
      document.getElementById('mce-error-response').innerHTML = ''
    }
  }
}
</script>

<style>
  main:focus {
    outline: none;
  }
  #page-wrapper:focus {
    outline: none;
  }
</style>
