export const state = () => ({
  isLoading: false,
  pathName: ''
})

export const mutations = {
  setIsLoading(s, p) {
    s.isLoading = p
  },
  setPathName(s, p) {
    s.pathName = p
  }
}

export const actions = {
  setIsLoading({ commit }, val) {
    commit('setIsLoading', val)
  },
  setPathName({ commit }, val) {
    commit('setPathName', val)
  }
}

export const getters = {
  isLoading: s => {
    return s.isLoading
  },
  pathName: s => {
    return s.pathName
  }
}
