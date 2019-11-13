export const state = () => ({
  admin: {},
  admins: []
})

export const mutations = {
  setList(s, p) {
    s.admins = {
      list: p.data,
      pagination: p.pagination
    }
  },
  setAdmin(s, p) {
    s.admin = p
  }
}

export const actions = {
  async setList({ commit }, q) {
    await this.$axios
      .get(`/api/v1/admin/admins`, {
        params: q
      })
      .then(res => {
        commit('setList', res.data)
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  },
  async setAdmin({ commit }, id) {
    try {
      const { data } = await this.$axios.get(`/api/v1/admin/admins/${id}`)

      commit('setAdmin', data.data)

      return { error: false }
    } catch (err) {
      return { error: true, errors: err.response.data.errors }
    }
  },
  async create({ commit }, params) {
    try {
      const { data } = await this.$axios.post('/api/v1/admin/admins', params)

      commit('setAdmin', data.data)

      return { error: false }
    } catch (err) {
      return { error: true, errors: err.response.data.errors }
    }
  },
  async update({ commit }, params) {
    try {
      const { data } = await this.$axios.put(
        `/api/v1/admin/admins/${params.admin.id}`,
        params
      )

      commit('setAdmin', data.data)

      return { error: false }
    } catch (err) {
      return { error: true, errors: err.response.data.errors }
    }
  },
  async searchList({ commit }, q) {
    await this.$axios
      .get(`/api/v1/admin/admins`, {
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
  admin: s => {
    return s.admin
  },
  admins: s => {
    return s.admins
  }
}
