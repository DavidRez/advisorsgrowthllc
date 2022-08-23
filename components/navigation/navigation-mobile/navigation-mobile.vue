<template lang='pug' src='./navigation-mobile.pug'></template>

<script>
import { bodyScroll, removeFocus, trapFocus } from '~/resources/mixins'

export default {
  mixins: [
    bodyScroll,
    removeFocus,
    trapFocus
  ],
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    drawerOpen: {
      type: Boolean,
      default: false
    },
    links: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    currFocus: null
  }),
  watch: {
    drawerOpen (newVal, oldVal) {
      if (newVal) {
        this.$_stopBodyScroll()
        this.$_removeFocus()
        this.$nextTick(() => {
          this.$_trapFocus(this.$refs.drawerContainer)
        })
      }
    }
  },
  methods: {
    closeDrawer () {
      this.$emit('close-drawer', false)
      this.$_resetBodyScroll()
      this.$_removeFocus()
    },
    handleMouseLeave () {
      console.log('leave')
    },
    addFocus (i) {
      this.currFocus = i
    },
    removeFocus () {
      this.currFocus = null
    }
  }
}
</script>

<style lang='sass' src='./navigation-mobile.sass'></style>
