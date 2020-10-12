import {
  SET_SCROLLED,
  VIEW_MENU
} from './mutation-types.js'

const stateMutations = () => ({
  [SET_SCROLLED] (state, data) {
    state.scrolled = data
  },
  [VIEW_MENU] (state, data) {
    state.menu = data
  }
})

export default stateMutations
