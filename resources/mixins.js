export const closeMenu = {
  methods: {
    $_closeMenu () {
      this.$store.dispatch('VIEW_MENU', false)
      document.body.classList.remove('body-stop')
    }
  }
}
