import {
  // GET_BLOG,
  // GET_BLOG_ARR
  GET_GLOBAL,
  SET_SCROLLED,
  VIEW_MENU,
} from './mutation-types'

import api from '~/resources/api'

const stateActions = () => ({
  GET_GLOBAL ({ commit, }) {
    (async () => {
      try {
        const response = await this.$axios.$get(`${api}/wp/v2/globalData`)
        const data = response.reduce(
          (allData, data) => ({
            ...allData,
            [data.slug]: {
              ...data.acf,
            },
          }),
          {}
        )
        commit(GET_GLOBAL, data)
      } catch (e) { console.log('GLOBAL DATA API: ' + e) }
    })()
  },
  // GET_BLOG ({ commit }) {
  //   (async () => {
  //     try {
  //       var response = await axios.get(`${api}/wp/v2/blogs?per_page=100`)
  //       const dataArr = response.data.reduce(
  //         (acc, item) => ([ ...acc, { link: '/blogs/' + item.slug, slug: item.slug, ...item.acf } ]),
  //         []
  //       )
  //       const data = response.data.reduce(
  //         (allData, data) => ({ ...allData, [data.slug]: { link: '/blogs/' + data.slug, ...data.acf } }),
  //         {}
  //       )
  //       commit(GET_BLOG_ARR, dataArr)
  //       commit(GET_BLOG, data)
  //     } catch (e) {
  //       console.log('BLOGS API: ' + e)
  //     }
  //   })()
  // },
  SET_SCROLLED ({ commit, }, data) {
    commit(SET_SCROLLED, data)
  },
  VIEW_MENU ({ commit, }, data) {
    commit(VIEW_MENU, data)
  },
  async nuxtServerInit ({ dispatch, }) {
    await dispatch(GET_GLOBAL)
  },
})

export default stateActions
