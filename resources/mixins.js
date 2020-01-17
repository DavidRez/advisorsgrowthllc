export const onScroll = {
  methods: {
    $_onScroll ({ going }) {
      if (going === 'in') {
        this.active = true
      }
    }
  }
}
