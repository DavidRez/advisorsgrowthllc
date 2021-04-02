import storeActions from './storeActions'
import storeMutations from './storeMutations'

export const state = () => ({
  videoIsLoading: true,
  menu: false
})

export const actions = storeActions()

export const mutations = storeMutations()
