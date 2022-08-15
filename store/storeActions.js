import {
  VIDEO_LOADING,
  VIEW_MENU,
  VIEW_SITE,
  VIEW_THANK_YOU_MODAL
} from './mutation-types'

const stateActions = () => ({
  VIDEO_LOADING ({ commit }, data) {
    commit(VIDEO_LOADING, data)
  },
  VIEW_MENU ({ commit }, data) {
    commit(VIEW_MENU, data)
  },
  VIEW_SITE ({ commit }, data) {
    commit(VIEW_SITE, data)
  },
  VIEW_THANK_YOU_MODAL ({ commit }, data) {
    commit(VIEW_THANK_YOU_MODAL, data)
  }
})

export default stateActions
