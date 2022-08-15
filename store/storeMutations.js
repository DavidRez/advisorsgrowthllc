import {
  VIDEO_LOADING,
  VIEW_MENU,
  VIEW_SITE,
  VIEW_THANK_YOU_MODAL
} from './mutation-types.js'

const stateMutations = () => ({
  [VIDEO_LOADING] (state, data) {
    state.videoIsLoading = data
  },
  [VIEW_MENU] (state, data) {
    state.menu = data
  },
  [VIEW_SITE] (state, data) {
    state.siteLoaded = data
  },
  [VIEW_THANK_YOU_MODAL] (state, data) {
    state.thankYouModalOpen = data
  }
})

export default stateMutations
