import {
  SET_SCROLLED,
  VIEW_MENU
} from './mutation-types'

const stateActions = () => ({
  SET_SCROLLED ({ commit }, data) {
    commit(SET_SCROLLED, data)
  },
  VIEW_MENU ({ commit }, data) {
    commit(VIEW_MENU, data)
  }
})

export default stateActions
