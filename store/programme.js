import fileDownload from 'js-file-download'

export const state = () => ({
  programme: null,
  programmes: []
})

export const mutations = {
  setList(s, p) {
    s.programmes = {
      list: p.data,
      pagination: p.pagination
    }
  },
  setProgramme(s, p) {
    s.programme = p
  }
}

export const actions = {
  async setList({ commit }, q) {
    await this.$axios
      .get(`/api/v1/admin/programmes`, {
        params: q
      })
      .then(res => {
        commit('setList', res.data)
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  },
  async setProgramme({ commit }, id) {
    try {
      const { data } = await this.$axios.get(`/api/v1/admin/programmes/${id}`)

      commit('setProgramme', data.data)

      return { error: false }
    } catch (err) {
      return { error: true, errors: err.response.data.errors }
    }
  },
  async create({ commit }, params) {
    try {
      const { data } = await this.$axios.post(
        '/api/v1/admin/programmes',
        params
      )

      commit('setProgramme', data.data)

      return { error: false }
    } catch (err) {
      return { error: true, errors: err.response.data.errors }
    }
  },
  async searchList({ commit }, q) {
    await this.$axios
      .get(`/api/v1/admin/programmes`, {
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
      .get(`/api/v1/admin/export_programmes`, {
        responseType: 'arraybuffer',
        params: q
      })
      .then(res => {
        fileDownload(res.data, 'senarai_program.xlsx')
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  }
}

export const getters = {
  programme: s => {
    return s.programme
  },
  programmes: s => {
    return s.programmes
  }
}
