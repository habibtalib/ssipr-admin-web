export const state = () => ({
  authBtn: ['', '']
})

export const mutations = {
  setAuthBtn(s, p) {
    s.authBtn = p
  }
}

export const actions = {
  setAuthBtn({ commit }, val) {
    commit('setAuthBtn', val)
  }
}

export const getters = {
  authBtn: s => {
    return s.authBtn
  }
}
