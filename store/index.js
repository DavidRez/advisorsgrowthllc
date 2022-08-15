import storeActions from './storeActions'
import storeMutations from './storeMutations'

export const state = () => ({
  menu: false,
  siteLoaded: false,
  thankYouModalOpen: false,
  videoIsLoading: true
})

export const actions = storeActions()

export const mutations = storeMutations()
