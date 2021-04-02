import {
  VIDEO_LOADING,
  VIEW_MENU
} from './mutation-types'

const stateActions = () => ({
  VIDEO_LOADING ({ commit }, data) {
    commit(VIDEO_LOADING, data)
  },
  VIEW_MENU ({ commit }, data) {
    commit(VIEW_MENU, data)
  }
})

export default stateActions
