import fileDownload from 'js-file-download'

export const state = () => ({
  application: null,
  applications: []
})

export const mutations = {
  setList(s, p) {
    s.applications = {
      list: p.data,
      pagination: p.pagination
    }
  },
  setApplication(s, p) {
    s.application = p
  }
}

export const actions = {
  async create({ commit, dispatch }, params) {
    try {
      const { data } = await this.$axios.post(
        '/api/v1/admin/applications',
        params
      )

      commit('setApplication', data.data)

      return { error: false }
    } catch (err) {
      return { error: true, errors: err.response.data.errors }
    }
  },
  async update({ commit, dispatch }, params) {
    try {
      const { data } = await this.$axios.put(
        `/api/v1/app_doc/update_external/${params.docket.id}`,
        params
      )

      // eslint-disable-next-line no-console
      console.log(data)

      return { error: false }
    } catch (err) {
      return { error: true, errors: err.response.data.errors }
    }
  },
  async setList({ commit }, q) {
    await this.$axios
      .get(`/api/v1/admin/applications`, {
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
      .get(`/api/v1/admin/applications`, {
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
      .get(`/api/v1/admin/export_dockets`, {
        responseType: 'arraybuffer',
        params: q
      })
      .then(res => {
        fileDownload(res.data, 'senarai_permohonan.xlsx')
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  },
  async setApplicationFromToken({ commit }, token) {
    await this.$axios
      .get(`/api/v1/app_doc/verify_external?token=${token}`)
      .then(res => {
        commit('setApplication', res.data.data)
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  }
}

export const getters = {
  application: s => {
    return s.application
  },
  applications: s => {
    return s.applications
  }
}
