import {
  VIDEO_LOADING,
  VIEW_MENU
} from './mutation-types.js'

const stateMutations = () => ({
  [VIDEO_LOADING] (state, data) {
    state.videoIsLoading = data
  },
  [VIEW_MENU] (state, data) {
    state.menu = data
  }
})

export default stateMutations
