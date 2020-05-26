import storeActions from './storeActions'
import storeMutations from './storeMutations'

export const state = () => ({
  // blog: {},
  // blogArr: [],
  pages: {},
  globalData: {},
  scrolled: {},
  menu: false
})

export const actions = storeActions()

export const mutations = storeMutations()
