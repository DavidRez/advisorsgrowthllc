<template lang="pug" src="./form-apply.pug"></template>

<script>
import { Storage, Auth } from 'aws-amplify'
import { config } from '~/resources/aws-config'
import { trapFocus, fadeIn } from '~/resources/mixins'

export default {
  mixins: [trapFocus, fadeIn],
  props: {
    centered: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    firstName: '',
    lastName: '',
    clientEmail: '',
    clientPhone: '',
    subject: '',
    letterLabel: 'Cover Letter',
    letters: [],
    letterObj: null,
    resumeLabel: 'Resume',
    resumes: [],
    resumeObj: null,
    filesHtml: '',
    postUrl: ``,
    imageUrl: '',
    formSubmitted: false,
    formSuccess: false,
    modalOpen: false
  }),
  created () {
    Auth.signIn(config.website.EMAIL, config.website.SECRET)
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
    this.subject = `Apply for ${this.position}`
  },
  methods: {
    uploadLetter () {
      const letters = this.$refs.letter.files

      const lettername = `${Date.now()}-${letters[0].name}`

      this.letterObj = {
        'url': this.imageUrl + lettername,
        'original': letters[0].name,
        'new': lettername
      }

      Storage.vault.put(lettername, letters[0], { contentType: letters[0].type })

      this.letters = this.$refs.letter.files
      this.letterLabel = this.letterObj.original
    },
    removeLetter () {
      this.letterLabel = 'Cover Letter'
      Storage.vault.remove(this.letterObj.new)
      this.letterObj = null
    },
    uploadResume () {
      const resumes = this.$refs.resume.files

      const resumename = `${Date.now()}-${resumes[0].name}`

      this.resumeObj = {
        'url': this.imageUrl + resumename,
        'original': resumes[0].name,
        'new': resumename
      }
      Storage.vault.put(resumename, resumes[0], { contentType: resumes[0].type })

      this.resumes = this.$refs.resume.files
      this.resumeLabel = this.resumeObj.original
    },
    removeResume () {
      this.resumeLabel = 'Resume'
      Storage.vault.remove(this.resumeObj.new)
      this.resumeObj = null
    },
    createLabel () {
      this.filesHtml = ''

      if (this.letterObj) {
        this.filesHtml += `
          <tr>
            <td style="font-size: 20px;">
              <h5 style="margin-top: 0; padding-top: 0; font-weight: 300;"><a href="${this.letterObj.url}">Download Cover Letter</a></h5>
            </td>
          </tr>
        `
      }

      if (this.resumeObj) {
        this.filesHtml += `
          <tr>
            <td style="font-size: 20px;">
              <h5 style="margin-top: 0; padding-top: 0; font-weight: 300;"><a href="${this.resumeObj.url}">Download Resume</a></h5>
            </td>
          </tr>
        `
      }
    },
    validate () {
      this.$validator.validateAll()
        .then((result) => {
          if (result) {
            this.onSubmit()
          } else {
            const errorArr = document.querySelectorAll('.form-apply__input--error')
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
      this.$_fadeIn(this.$refs.title, 24, 0, 'top+=58', 0, 1.2)
      this.$_fadeIn(this.$refs.body, 24, 0, 'top+=58', 0, 1.2)
      this.$_fadeIn(this.$refs.firstName, 24, 0, 'top+=58', 0, 1.2)
      this.$_fadeIn(this.$refs.lastName, 24, 0, 'top+=58', 0.1, 1.2)
      this.$_fadeIn(this.$refs.email, 24, 0, 'top+=58', 0.2, 1.2)
      this.$_fadeIn(this.$refs.phone, 24, 0, 'top+=58', 0.3, 1.2)
      this.$_fadeIn(this.$refs.subject, 24, 0, 'top+=58', 0.4, 1.2)
      this.$_fadeIn(this.$refs.upload, 24, 0, 'top+=58', 0.5, 1.2)
      this.$_fadeIn(this.$refs.button, 24, 0, 'top+=58', 0.6, 1.2)
    },
    async onSubmit () {
      this.createLabel()

      const formData = new FormData()
      for (let i = 0; i < this.letters.length; i++) {
        const letters = this.letters[i]
        formData.append('letters[' + i + ']', letters)
      }
      for (let i = 0; i < this.resumes.length; i++) {
        const resumes = this.resumes[i]
        formData.append('resumes[' + i + ']', resumes)
      }

      try {
        this.formSubmitted = true

        const emailTemplate = `
          <!DOCTYPE html>
          <html>
          <body>
            <div class="container" style="background-color: #ebf5ff; padding: 1.5rem 0;">
              <div style="padding: 2rem 0; margin: 0 auto;">
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
                          <h5 style="margin-top: 0; padding-top: 0; font-weight: 300; border-bottom: 1px solid #3f3f3f; margin-right: 10%;">${this.firstName}</h5>
                        </td>
                        <td style="width: 50%; font-size: 20px;">
                          <h5 style="margin-top: 0; padding-top: 0; font-weight: 300; border-bottom: 1px solid #3f3f3f; margin-right: 10%;">${this.lastName}</h5>
                        </td>
                      </tr>
                    </table>
                    <table style="width: 100%; text-align: left">
                      <tr>
                        <th>
                          <p style="font-size: 14px; margin-bottom: .5rem; color: #848484; font-weight: 300;">E-Mail</p>
                        </th>
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
                    <table style="width: 100%; text-align: left">
                      <tr>
                        <th>
                          <p style="font-size: 14px; margin-bottom: .5rem; color: #848484; font-weight: 300;">Attachments</p>
                        </th>
                      </tr>
                      ${this.filesHtml}
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
            subject: `${this.subject}`,
            from: `${this.clientEmail}`,
            // two email addresses are written as:'matt.sprague@roostergrin.com:second.email@example.com'
            to: `info@advisorgrowthllc.com`,
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
          this.firstName = ''
          this.lastName = ''
          this.clientEmail = ''
          this.clientPhone = ''
          this.subject = `Apply for ${this.position}`
          this.letterLabel = 'Cover Letter'
          this.letters = []
          this.letterObj = null
          this.resumeLabel = 'Resume'
          this.resumes = []
          this.resumeObj = null
          this.attachment = []
          this.filesHtml = ''
          this.fileLabel = '0 files'
        }, 1000)

        setTimeout(() => {
          this.errors.clear()
          this.$router.push('/careers-thank-you')
        }, 1100)
      } catch (e) {
        console.error(e, 'submitted')
      }
    }
  }
}
</script>

<style lang="sass" src="./form-apply.sass" ></style>
