<template lang="pug" src="./form-contact.pug"></template>

<script>

export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      clientEmail: '',
      clientPhone: '',
      isFirstTime: false,
      firstTimeMessage: 'No, I am not a first time patient',
      clientMessage: '',
      postUrl: `https://aamuwi383c.execute-api.us-west-1.amazonaws.com/prod/roostergrin-emailer`,
      formSubmitted: false,
      formSuccess: false,
      modalShowing: false,
    }
  },
  methods: {
    validate () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.onSubmit()
          }
        })
        .catch((e) => {
          console.log(e)
        })
    },
    closeModal () {
      this.formSuccess = false
      this.formSubmitted = false
      this.isFirstTime = false
      setTimeout(() => {
        this.modalShowing = false
      }, 150)
    },
    async onSubmit () {
      this.formSubmitted = true

      if (this.isFirstTime) {
        this.firstTimeMessage = 'Yes, I am a first time patient'
      }

      const emailTemplate = `
        <!DOCTYPE html><html lang="en" dir="ltr">
          <head>
            <meta charset="utf-8">
            <title></title>
          </head>
          <body>
            <p><h4><strong>Form Submission by: </strong></h4> ${this.firstName} ${this.lastName}</p>
            <p><h4><strong>Email: </strong></h4> ${this.clientEmail}</p>
            <p><h4><strong>Phone: </strong></h4> ${this.clientPhone}</p>
            <p><h4><strong>New Patient: </strong></h4> ${this.firstTimeMessage}</p>
            <p><h4><strong>Message:</strong></h4> ${this.clientMessage}</p>
          </body>
        </html>
      `

      await this.$axios.$post(this.postUrl, null, {
        params: {
          subject: `RG Boilerplate Contact Form`,
          from: `no-reply@rg-media.com`,
          to: `patricia.anderson@roostergrin.com`,
          body: emailTemplate,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          this.formSuccess = true
          setTimeout(() => {
            this.modalShowing = true
          }, 750)
          setTimeout(() => {
            this.firstName = ''
            this.lastName = ''
            this.clientEmail = ''
            this.clientPhone = ''
            this.clientMessage = ''
          }, 1000)
          setTimeout(() => {
            this.errors.clear()
          }, 1100)
        })
        .catch((e) => {
          console.log(e, 'submitted')
        })
    },
  },
}
</script>

<style lang="sass" src="./form-contact.sass" ></style>
