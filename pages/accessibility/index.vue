<template lang="pug">
  .pages-accessibility(:style="{ minHeight: `${elemMinHeight}px` }")
    .pages-accessibility__container
      h1.pages-accessibility__title(ref='title') Accessibility Statement
      .pages-accessibility__col(ref='text')
        p {{ props.company_name }} is committed to facilitating the accessibility and usability of its website, {{ companyDomain }}, for everyone.  {{ props.company_name }} aims to comply with all applicable standards, including the World Wide Web Consortium's Web Content Accessibility Guidelines 2.0 up to Level AA (WCAG 2.0 AA).
        p {{ props.company_name }} is proud of the efforts that we have completed and that are in-progress to ensure that our website is accessible to everyone. Should you experience any difficulty in accessing any part of this website #[span(v-if='props.phone.number') , please feel free to call us at {{ props.phone.number }} or ] email us at #[a(:href='"mailto:" + props.email' tabindex='0') {{ props.email }} ] and we will work with you to provide the information or service you seek through an alternate communication method that is accessible for you consistent with applicable law (for example, through telephone support).
</template>

<script>
import { setData } from '~/resources/utils'
import { url } from '~/resources/api'
import { debounce, fadeIn } from '~/resources/mixins'

export default {
  components: {},
  mixins: [
    debounce,
    fadeIn
  ],
  data: () => ({
    companyDomain: url.slice(0, -1),
    elemMinHeight: 0,
    windowWidth: 0
  }),
  async asyncData () {
    const data = await setData('global', 'globalData')
    return { props: data }
  },
  mounted () {
    this.handleWindowResize()
    window.addEventListener('resize', this.debounceFunc)
    this.$nextTick(() => {
      if (!this.$store.state.siteLoaded) {
        this.$store.dispatch('VIEW_SITE', true)
      }
      this.handleAnimation()
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.debounceFunc)
  },
  methods: {
    debounceFunc () {
      this.debounce(this.handleWindowResize, null, 300)
    },
    handleWindowResize () {
      this.windowWidth = window.innerWidth
      this.setMinHeight()
    },
    handleAnimation () {
      this.$_fadeIn(this.$refs.title, 24, 0, 'top+=58', 0, 1.2)
      this.$_fadeIn(this.$refs.text, 24, 0, 'top+=58', 0, 1.2)
    },
    setMinHeight () {
      const footerHeight = document.querySelector('footer').clientHeight
      const navHeight = document.querySelector('header').children[0].clientHeight
      this.elemMinHeight = window.innerHeight - (footerHeight + navHeight)
    }
  },
  transition: 'fade'
}
</script>

<style lang="sass" src="./index.sass"></style>
