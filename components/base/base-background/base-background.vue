<template lang='pug' src='./base-background.pug'></template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: () => ``
    },
    webp: {
      type: String,
      default: () => ``
    },
    jp2: {
      type: String,
      default: () => ``
    },
    bgColor: {
      type: String,
      default: '#ffffff'
    },
    alt: {
      type: String,
      default: () => {
        if (process.client) {
          return `${document.location.hostname} image for section`
        }
      }
    }
  },
  data () {
    return {
      currentImg: null,
      loading: true,
      loaded: false,
      theBrowser: null,
      intersectionOptions: {
        root: null,
        rootMargin: '500px 0px 0px 0px',
        threshold: [ 0.01 ]
      }
    }
  },
  mounted () {
    this.loaded = true
    const browser = navigator.userAgent
    if (browser.includes('Safari') && !browser.includes('Chrome')) {
      this.theBrowser = 'safari'
    }
    if (browser.includes('Trident')) {
      this.theBrowser = 'ie11'
    }
  },
  methods: {
    onWaypoint ({ going, direction }) {
      if (going === 'in') {
        const downloadingImage = new Image()
        if (this.theBrowser === 'ie11') {
          this.currentImg = this.src
          this.loading = false
          return
        } else if (this.theBrowser === 'safari') {
          this.currentImg = this.jp2
          if (this.src && !this.jp2) {
            this.currentImg = this.src
          }
        } else {
          this.currentImg = this.webp
          if (this.src && !this.webp) {
            this.currentImg = this.src
          }
        }
        downloadingImage.onload = () => {
          this.loading = false
        }
        downloadingImage.src = this.currentImg
      }
    }
  }
}
</script>

<style lang="sass" src="./base-background.sass"></style>
