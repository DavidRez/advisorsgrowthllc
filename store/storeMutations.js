import {
  // GET_BLOGS,
  // GET_BLOGS_ARR,
  GET_PAGES,
  GET_GLOBAL,
  SET_SCROLLED,
  VIEW_MENU
} from './mutation-types.js'

const stateMutations = () => ({
  // [GET_BLOGS] (state, data) {
  //   state.blogs = data
  // },
  // [GET_BLOGS_ARR] (state, data) {
  //   state.blogsArr = data
  // },
  [GET_GLOBAL] (state, data) {
    state.globalData = data
  },
  [GET_PAGES] (state, data) {
    state.pages = data
  },
  [SET_SCROLLED] (state, data) {
    state.scrolled = data
  },
  [VIEW_MENU] (state, data) {
    state.menu = data
  }
})

export default stateMutations
