export const onScroll = {
  methods: {
    $_onScroll ({ going }) {
      if (going === 'in') {
        this.active = true
      }
    }
  }
}

export const trapFocus = {
  methods: {
    $_trapFocus (element) {
      const focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])')
      const firstFocusableEl = focusableEls[0]
      const lastFocusableEL = focusableEls[focusableEls.length - 1]

      element.style.outline = 'transparent'

      element.addEventListener('keydown', function (e) {
        const isTabPressed = (e.key === 'Tab' || e.keyCode === 9)

        if (!isTabPressed) {
          return
        }

        /* eslint-disable */
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableEl) {
              e.preventDefault()
            lastFocusableEL.focus()
          }
        } else {
          if (document.activeElement === lastFocusableEL) {
            e.preventDefault()
            firstFocusableEl.focus()
          }
        }
      })
      element.focus()
    }
  }
}

export const removeFocus = {
  methods: {
    $_removeFocus () {
      document.activeElement.blur()
    }
  }
}

export const bodyScroll = {
  methods: {
    $_stopBodyScroll () {
      const scrollbarOffset = window.innerWidth - document.documentElement.clientWidth
      document.body.classList.add('body-stop')
      document.body.style.paddingRight = `${scrollbarOffset}px`
    },
    $_resetBodyScroll () {
      document.body.classList.remove('body-stop')
      document.body.style.paddingRight = ''
    }
  }
}

export const debounce = {
  data: () => ({
    debounceLastTimeout: null
  }),
  methods: {
    debounce (func, args, wait, immediate) {
      const later = () => {
        this.debounceLastTimeout = null
        if (!immediate) {
          func(args)
        }
      }
      const callNow = immediate && !this.debounceLastTimeout
      clearTimeout(this.debounceLastTimeout)
      this.debounceLastTimeout = setTimeout(later, wait)
      if (callNow) {
        func(args)
      }
    }
  }
}

export const fadeIn = {
  methods: {
    $_fadeIn (element, yStart = 0, xStart = 0, start = 'top+48', delay = 0, duration = 1) {
      this.$CustomEase.create('customEaseOut', '0.23, 1, 0.32, 1')

      const tl = this.$gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: `${start} bottom`
        }
      })

      tl.from(element, {
        x: xStart,
        y: yStart,
        opacity: 0,
        duration: duration,
        ease: 'customEaseOut',
        delay: delay
      })
    }
  }
}

export const parallax = {
  methods: {
    $_parallax (element, trigger, yStart = 0, ease = 'none') {
      const tl = this.$gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })

      tl.to(element, {
        y: yStart,
        ease: ease
      })
    }
  }
}