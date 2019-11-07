import fileDownload from 'js-file-download'

export const state = () => ({
  agency: null,
  agencies: []
})

export const mutations = {
  setList(s, p) {
    s.agencies = {
      list: p.data,
      pagination: p.pagination
    }
  },
  setAgency(s, p) {
    s.agency = p
  }
}

export const actions = {
  async setList({ commit }, q) {
    await this.$axios
      .get(`/api/v1/admin/agencies`, {
        params: q
      })
      .then(res => {
        commit('setList', res.data)
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  },
  async setAgency({ commit }, id) {
    try {
      const { data } = await this.$axios.get(`/api/v1/admin/agencies/${id}`)

      commit('setAgency', data.data)

      return { error: false }
    } catch (err) {
      return { error: true, errors: err.response.data.errors }
    }
  },
  async create({ commit }, params) {
    try {
      const { data } = await this.$axios.post('/api/v1/admin/agencies', params)

      commit('setAgency', data.data)

      return { error: false }
    } catch (err) {
      return { error: true, errors: err.response.data.errors }
    }
  },
  async searchList({ commit }, q) {
    await this.$axios
      .get(`/api/v1/admin/agencies`, {
        params: q
      })
      .then(res => {
        commit('setList', res.data)
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  },
  async exportList({ commit }, q) {
    await this.$axios
      .get(`/api/v1/admin/export_agencies`, {
        responseType: 'arraybuffer',
        params: q
      })
      .then(res => {
        fileDownload(res.data, 'senarai_agensi.xlsx')
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  }
}

export const getters = {
  agency: s => {
    return s.agency
  },
  agencies: s => {
    return s.agencies
  }
}
