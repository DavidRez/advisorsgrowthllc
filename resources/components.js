import Vue from 'vue'
import BaseBackground from '../components/base/base-background/base-background'
import BaseIcon from '../components/base/base-icon/base-icon'
import BaseImage from '../components/base/base-image/base-image'
import BaseLoader from '../components/base/base-loader/base-loader'

const components = () => {
  Vue.component('BaseBackground', BaseBackground)
  Vue.component('BaseIcon', BaseIcon)
  Vue.component('BaseImage', BaseImage)
  Vue.component('BaseLoader', BaseLoader)
}

export default components()
