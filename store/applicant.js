export const state = () => ({
  applicant: null,
  applicants: []
})

export const mutations = {
  setList(s, p) {
    s.applicants = {
      list: p.data,
      pagination: p.pagination
    }
  },
  setApplication(s, p) {
    s.applicants = p
  }
}

export const actions = {
  async setList({ commit }, q) {
    await this.$axios
      .get(`/api/v1/admin/applicants`, {
        params: q
      })
      .then(res => {
        commit('setList', res.data)
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  },
  async searchList({ commit }, q) {
    await this.$axios
      .get(`/api/v1/admin/applicants`, {
        params: q
      })
      .then(res => {
        commit('setList', res.data)
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  }
}

export const getters = {
  applicant: s => {
    return s.application
  },
  applicants: s => {
    return s.applicants
  }
}
