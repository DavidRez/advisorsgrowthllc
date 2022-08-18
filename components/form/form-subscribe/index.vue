<template lang="pug" src="./index.pug"></template>

<script>
import { trapFocus } from '~/resources/mixins'

export default {
  mixins: [trapFocus],
  props: {
    props: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    clientEmail: '',
    formSubmitted: false,
    formSuccess: false
  }),
  mounted () {
    this.$validator.pause()
  },
  methods: {
    validate () {
      this.$validator.resume()
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.onSubmit()
          } else {
            this.$nextTick(() => {
              const errorArr = document.querySelectorAll('.form-subscribe__input--error')
              errorArr[0].focus()
            })
          }
        })
        .catch((e) => {
          console.error(e)
        })
    },
    async onSubmit () {
      try {
        const portalId = '4784979'
        const formGuid = '2c12ed74-4d36-416d-a86e-a813640f9f14'
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        const postURL = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}/`
        this.formSubmitted = true
        await this.$axios.post(postURL, {
          fields: [
            {
              name: 'email',
              value: this.clientEmail
            }
          ],
          context: {
            pageUri: 'https://www.advisorgrowthllc.com/subscribe',
            pageName: 'Subscribe Page'
          }
        },
        config
        )

        this.formSuccess = true

        setTimeout(() => {
          this.$store.dispatch('VIEW_THANK_YOU_MODAL', true)
        }, 750)

        setTimeout(() => {
          this.firstname = ''
          this.lastname = ''
          this.clientEmail = ''
          this.formSuccess = false
          this.formSubmitted = false
        }, 1000)

        setTimeout(() => {
          this.errors.clear()
        }, 1100)
      } catch (e) {
        console.error(e, 'submitted')
      }
    }
  }
}
</script>

<style lang="sass" src="./index.sass" ></style>
