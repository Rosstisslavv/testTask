import axios from 'axios'
export default {
  state: {
    profiles: [],
    numOfElements: 10,
    profilesStatus: 'Все',
    page: 1,
    search: '',
    actionType: '',
    selectedProfile: null
  },
  actions: {
    async fetchProfiles({ commit }) {
      const res = await axios.get('https://retoolapi.dev/q81Avj/data')
      const profiles = await res.data
      console.log(profiles, 'govno')
      commit('updateProfiles', profiles)
    }
  },
  mutations: {
    updateProfiles(state, profiles) {
      state.profiles = profiles
    },
    updateNumOfElements(state, numOfElements) {
      state.numOfElements = numOfElements
    },
    updateProfilesStatus(state, profilesStatus) {
      state.profilesStatus = profilesStatus
    },
    updateNumOfPages(state, numOfPages) {
      state.pages = numOfPages
    },
    updateCurrentPage(state, currentPage) {
      state.page = currentPage
    },
    updateSearch(state, search) {
      state.search = search
    },
    updateActionType(state, actionType) {
      state.actionType = actionType
    },
    updateSelectedProfile(state, selectedProfile) {
      state.selectedProfile = selectedProfile
    }
  },
  getters: {
    allProfiles(state) {
      return state.profiles
    },
    numOfElements(state) {
      return state.numOfElements
    },
    search(state) {
      return state.search
    },
    actionType(state) {
      return state.actionType
    },
    currentPage(state) {
      return state.page
    },
    profilesStatus(state) {
      return state.profilesStatus
    },
    selectedProfile(state) {
      return state.selectedProfile
    },
    limitedProfiles(state) {
      return state.profiles.slice(page * limit, (page + 1) * limit)
    },
    filteredProfiles(state) {
      const filters = {
        Все: (item) => true,
        Обработанные: (item) => item.status,
        Необработанные: (item) => !item.status
      }
      const filter = filters[state.profilesStatus] || filters['Все']
      let filteredProfiles = state.profiles.filter(filter)

      if (state.search !== '') {
        filteredProfiles = filteredProfiles.filter((item) => {
          if (item.firstName) {
            return item.firstName.toLowerCase().includes(state.search.toLowerCase())
          } else {
            return false // Skip the item if firstName is undefined
          }
        })
      }
      return filteredProfiles.slice(
        (state.page - 1) * state.numOfElements,
        state.page * state.numOfElements
      )
    },
    pages(state) {
      const filteredProfilesLength = state.filteredProfiles?.length || state.profiles.length
      return Math.ceil(filteredProfilesLength / state.numOfElements)
    }
  }
}
