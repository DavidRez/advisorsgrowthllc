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
      modalOpen: false
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
          console.error(e)
        })
    },
    closeModal () {
      this.formSuccess = false
      this.formSubmitted = false
      this.isFirstTime = false
      setTimeout(() => {
        this.modalOpen = false
      }, 150)
    },
    async onSubmit () {
      try {
        this.formSubmitted = true

        if (this.isFirstTime) {
          this.firstTimeMessage = 'Yes, I am a first time patient'
        }

        const emailTemplate = `
          <!DOCTYPE html>
          <html>
          <body>
            <div class="container" style="background-color: #ebf5ff; padding: 1.5rem 0;">
              <div style="padding: 2rem 0; margin: 0 auto;"><img style="width: auto; height: 6rem; display: block; margin-left: auto; margin-right: auto; margin-bottom: 1rem;" src="https://www.roostergrin.com/wp-content/uploads/2019/11/rg-logo.png">
                <h1 style="font-size: 40px; margin: 0; text-align: center; width: 100%; color: #003b75;">Form Received!</h1></div>
            </div>
            <div class="section" style="background-color: #fdfdfd;">
              <div class="container" style="padding: 4rem 32px 1rem 32px; max-width: 1440px; margin: 0 auto">
                <div class="card-holder" style="padding: 7px; background-color: #e6e6e6;">
                  <div class="card-holder" style="padding: 2rem; background-color: white;">
                    <table style="width: 100%; text-align: left">
                      <tr>
                        <th>
                          <p style="font-size: 14px; margin-bottom: .5rem; color: #848484; font-weight: 300;">First Name</p>
                        </th>
                        <th>
                          <p style="font-size: 14px; margin-bottom: .5rem; color: #848484; font-weight: 300;">Last Name</p>
                        </th>
                      </tr>
                      <tr>
                        <td style="width: 50%; font-size: 20px;">
                          <h5 style="margin-top: 0; padding-top: 0; font-weight: 300; border-bottom: 1px solid #3f3f3f; margin-right: 10%;">${this.firstName}</h5></td>
                        <td style="width: 50%; font-size: 20px;">
                          <h5 style="margin-top: 0; padding-top: 0; font-weight: 300; border-bottom: 1px solid #3f3f3f; margin-right: 10%;">${this.lastName}</h5></td>
                      </tr>
                    </table>
                    <table style="width: 100%; text-align: left">
                      <tr>
                        <th>
                          <p style="font-size: 14px; margin-bottom: .5rem; color: #848484; font-weight: 300;">E-Mail</p>
                        </th>
                        <th>
                          <p style="font-size: 14px; margin-bottom: .5rem; color: #848484; font-weight: 300;">Phone</p>
                        </th>
                      </tr>
                      <tr>
                        <td style="width: 50%; font-size: 20px;">
                          <h5 style="margin-top: 0; padding-top: 0; font-weight: 300; border-bottom: 1px solid #3f3f3f; margin-right: 10%;">${this.clientEmail}</h5></td>
                        <td style="width: 50%; font-size: 20px;">
                          <h5 style="margin-top: 0; padding-top: 0; font-weight: 300; border-bottom: 1px solid #3f3f3f; margin-right: 10%;">${this.clientPhone}</h5></td>
                      </tr>
                    </table>
                    <table style="width: 50%; text-align: left">
                      <tr>
                        <th>
                          <p style="font-size: 14px; margin-bottom: .5rem; color: #848484; font-weight: 300;">First time patient?</p>
                        </th>
                      </tr>
                      <tr>
                        <td style="width: 50%; font-size: 20px;">
                          <h5 style="margin-top: 0; padding-top: 0; font-weight: 300; border-bottom: 1px solid #3f3f3f; margin-right: 10%;">${this.firstTimeMessage}</h5></td>
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
                <p style="color: #3f3f3f;">This form was generated from <a href="#" target="blank" style="text-decoration: none">ClientWebsite.com</a></p>
              </div>
            </div>
          </body>
          </html>
        `
        await this.$axios.$post(this.postUrl, null, {
          params: {
            subject: `Website Contact Form`,
            from: `no-reply@roostergrin.com`,
            // two email addresses are written as:'matt.sprague@roostergrin.com:second.email@example.com'
            to: `matt.sprague@roostergrin.com`,
            body: emailTemplate
          },
          headers: {
            'Content-Type': 'application/json'
          }
        })

        this.formSuccess = true

        setTimeout(() => {
          this.modalOpen = true
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
      } catch (e) {
        console.error(e, 'submitted')
      }
    }
  }
}
</script>

<style lang="sass" src="./form-contact.sass" ></style>
