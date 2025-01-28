<template lang="pug" src="./form-contact.pug"></template>

<script>
import { trapFocus, fadeIn } from '~/resources/mixins'

export default {
  mixins: [trapFocus, fadeIn],
  props: {
    centered: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    fullname: '',
    clientEmail: '',
    clientMessage: '',
    postUrl: ``,
    formSubmitted: false,
    formSuccess: false,
    modalOpen: false,
    mathResponse: ''
  }),
  computed: {
    a () { return Math.round(Math.random() * 10) },
    b () { return Math.round(Math.random() * 10) },
    c () { return this.a + this.b }
  },
  mounted () {
    if (this.$store.state.siteLoaded) {
      this.handleAnimation()
    } else {
      this.$store.watch(
        state => this.$store.state.siteLoaded,
        (newVal) => {
          if (newVal) {
            this.handleAnimation()
          }
        }
      )
    }
  },
  methods: {
    validate () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            if (this.mathResponse === this.c.toString()) {
              this.onSubmit()
            }
            // this.onSubmit()
          } else {
            const errorArr = document.querySelectorAll('.form-contact__input--error')
            errorArr[0].focus()
          }
        })
        .catch((e) => {
          console.error(e)
        })
    },
    closeModal () {
      this.formSuccess = false
      this.formSubmitted = false

      setTimeout(() => {
        this.modalOpen = false
        const mainEl = document.getElementById('main-content')
        mainEl.focus()
      }, 150)
    },
    handleAnimation () {
      this.$_fadeIn(this.$refs.name, 24, 0, 'top+=58', 0, 1.2)
      this.$_fadeIn(this.$refs.email, 24, 0, 'top+=58', 0, 1.2)
      this.$_fadeIn(this.$refs.message, 24, 0, 'top+=58', 0, 1.2)
      this.$_fadeIn(this.$refs.button, 24, 0, 'top+=58', 0, 1.2)
    },
    async onSubmit () {
      try {
        this.formSubmitted = true

        const emailTemplate = `
          <!DOCTYPE html>
          <html>
          <body>
            <div class="container" style="background-color: #ebf5ff; padding: 1.5rem 0;">
                <div style="padding: 2rem 0; margin: 0 auto;"><h1 style="font-size: 40px; margin: 0; text-align: center; width: 100%; color: #003b75;">Form Received!</h1></div>
            </div>
            <div class="section" style="background-color: #fdfdfd;">
              <div class="container" style="padding: 4rem 32px 1rem 32px; max-width: 1440px; margin: 0 auto">
                <div class="card-holder" style="padding: 7px; background-color: #e6e6e6;">
                  <div class="card-holder" style="padding: 2rem; background-color: white;">
                    <table style="width: 100%; text-align: left">
                      <tr>
                        <th>
                          <p style="font-size: 14px; margin-bottom: .5rem; color: #848484; font-weight: 300;">Name</p>
                        </th>
                      </tr>
                      <tr>
                        <td style="width: 50%; font-size: 20px;">
                          <h5 style="margin-top: 0; padding-top: 0; font-weight: 300; border-bottom: 1px solid #3f3f3f; margin-right: 10%;">${this.fullname}</h5>
                        </td>
                      </tr>
                    </table>
                    <table style="width: 100%; text-align: left">
                      <tr>
                        <th>
                          <p style="font-size: 14px; margin-bottom: .5rem; color: #848484; font-weight: 300;">E-Mail</p>
                        </th>
                      </tr>
                      <tr>
                        <td style="width: 50%; font-size: 20px;">
                          <h5 style="margin-top: 0; padding-top: 0; font-weight: 300; border-bottom: 1px solid #3f3f3f; margin-right: 10%;">${this.clientEmail}</h5></td>
                      </tr>
                    </table>
                    <table style="width: 100%; text-align: left">
                      <tr>
                        <th>
                          <p style="font-size: 14px; margin-bottom: .5rem; color: #848484; font-weight: 300;">Message</p>
                        </th>
                      </tr>
                      <tr>
                        <td style="font-size: 20px;">
                          <h5 style="margin-top: 0; padding-top: 0; font-weight: 300;">${this.clientMessage}</h5></td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div class="container" style="padding: 0 32px 4rem 32px; max-width: 1440px; margin: 0 auto">
                <p style="color: #3f3f3f;">This form was generated from <a href="https://advisorgrowthllc.com" target="_blank" style="text-decoration: none">advisorgrowthllc.com</a></p>
              </div>
            </div>
          </body>
          </html>
        `
        await this.$axios.$post(this.postUrl, null, {
          params: {
            subject: `AGS Contact Form`,
            from: `${this.clientEmail}`,
            // two email addresses are written as:'matt.sprague@roostergrin.com:second.email@example.com'
            to: `info@test.com`,
            body: emailTemplate
          },
          headers: {
            'Content-Type': 'application/json'
          }
        })

        this.formSuccess = true

        setTimeout(() => {
          this.modalOpen = true
          this.$_trapFocus(this.$refs.contactFormModal)
        }, 750)

        setTimeout(() => {
          this.fullname = ''
          this.clientEmail = ''
          this.clientPhone = ''
          this.clientMessage = ''
          this.preferredCommunication = []
        }, 1000)

        setTimeout(() => {
          this.errors.clear()
          this.$router.push('/thank-you')
        }, 1100)
      } catch (e) {
        console.error(e, 'submitted')
      }
    }
  }
}
</script>

<style lang="sass" src="./form-contact.sass" ></style>
