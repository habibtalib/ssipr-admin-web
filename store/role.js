export const state = () => ({
  role: {},
  roles: []
})

export const mutations = {
  setList(s, p) {
    s.roles = {
      list: p.data,
      pagination: p.pagination
    }
  },
  setRole(s, p) {
    s.role = p
  }
}

export const actions = {
  async setList({ commit }, q) {
    await this.$axios
      .get(`/api/v1/admin/roles`, {
        params: q
      })
      .then(res => {
        commit('setList', res.data)
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  },
  async setRole({ commit }, id) {
    try {
      const { data } = await this.$axios.get(`/api/v1/admin/roles/${id}`)

      commit('setRole', data.data)

      return { error: false }
    } catch (err) {
      return { error: true, errors: err.response.data.errors }
    }
  },
  async create({ commit }, params) {
    try {
      const { data } = await this.$axios.post('/api/v1/admin/roles', params)

      commit('setRole', data.data)

      return { error: false }
    } catch (err) {
      return { error: true, errors: err.response.data.errors }
    }
  },
  async update({ commit }, params) {
    try {
      const { data } = await this.$axios.put(
        `/api/v1/admin/roles/${params.role.id}`,
        params
      )

      commit('setRole', data.data)

      return { error: false }
    } catch (err) {
      return { error: true, errors: err.response.data.errors }
    }
  },
  async searchList({ commit }, q) {
    await this.$axios
      .get(`/api/v1/admin/roles`, {
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
  role: s => {
    return s.role
  },
  roles: s => {
    return s.roles
  }
}
