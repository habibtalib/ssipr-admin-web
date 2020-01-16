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
  setApplicant(s, p) {
    s.applicant = p
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
  },
  async update({ commit, dispatch }, params) {
    try {
      const { data } = await this.$axios.put(
        `/api/v1/applicants/${params.applicant.ic}`,
        params
      )

      dispatch('setCurrentUser', data.data)

      return { error: false }
    } catch (err) {
      return { error: true, errors: err.response.data.errors }
    }
  },
  async setApplicant({ commit }, id) {
    try {
      const { data } = await this.$axios.get(`/api/v1/admin/applicants/${id}`)
      console.log('setApplicant', data.data)
      commit('setApplicant', data.data)

      return { error: false }
    } catch (err) {
      return { error: true, errors: err.response.data.errors }
    }
  }
}

export const getters = {
  applicant: s => {
    return s.applicant
  },
  applicants: s => {
    return s.applicants
  }
}
