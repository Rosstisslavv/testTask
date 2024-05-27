import axios from 'axios'
export default {
  state: {
    profiles: [],
    numOfElements: 10,
    profilesStatus: 'Все',
    page: 1
  },
  actions: {
    async fetchProfiles({ commit }) {
      const res = await axios.get('https://retoolapi.dev/D6xLg4/data')
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
    }
  },
  getters: {
    allProfiles(state) {
      return state.profiles
    },
    numOfElements(state) {
      return state.numOfElements
    },
    pages(state) {
      return Math.ceil(state.profiles.length / state.numOfElements)
    },
    currentPage(state) {
      return state.page
    },
    profilesStatus(state) {
      return state.profilesStatus
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
      return state.profiles
        .filter(filter)
        .slice((state.page - 1) * state.numOfElements, state.page * state.numOfElements)
    }
  }
}
