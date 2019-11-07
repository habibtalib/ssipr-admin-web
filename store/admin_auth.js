import Cookie from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
  token: null,
  currentUser: {}
})

export const mutations = {
  setToken(s, p) {
    s.token = p
  },
  setCurrentUser(s, p) {
    s.currentUser = p
  },
  resetToken(s) {
    s.token = null
  },
  resetCurrentUser(s) {
    s.currentUser = {}
  }
}

export const actions = {
  initAuth(vc, req) {
    let token
    let expiry

    if (req) {
      if (!req.headers.cookie) {
        return
      }

      const tokenCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('token='))
      const expiryCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('expiry='))

      if (!tokenCookie) {
        return
      }

      token = tokenCookie.split('=')[1]
      expiry = expiryCookie.split('=')[1]
    } else {
      token = localStorage.getItem('token')
      expiry = localStorage.getItem('expiry')
    }

    if (new Date().getTime() > Number.parseInt(expiry) || !token) {
      // vc.dispatch('auth/logout')
      return
    }

    vc.commit('setToken', token)
  },
  async login({ commit, dispatch }, params) {
    try {
      const { data, headers } = await this.$axios.post(
        '/api/v1/admin/login',
        params
      )

      commit('setToken', headers.token)

      const expiry = jwtDecode(headers.token).exp

      localStorage.setItem('token', headers.token)
      localStorage.setItem(
        'expiry',
        new Date().getTime() + Number.parseInt(expiry) * 1000
      )
      Cookie.set('token', headers.token)
      Cookie.set(
        'expiry',
        new Date().getTime() + Number.parseInt(expiry) * 1000
      )

      commit('setCurrentUser', data.data)

      return { error: false }
    } catch (err) {
      return { error: true }
    }
  },
  async register({ commit, dispatch }, params) {
    try {
      await this.$axios.post('/api/v1/register', params)
      return { error: false }
    } catch (err) {
      return { error: true, errors: err.response.data.errors }
    }
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
  async setCurrentUser({ commit }) {
    await this.$axios
      .get('/api/v1/admin/current_admin')
      .then(res => {
        commit('setCurrentUser', res.data.data)
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
  },
  logout({ commit }) {
    // const { data } = await this.$axios.post('/logout')
    // if (data.success) {}
    commit('resetToken')
    commit('resetCurrentUser')
    Cookie.remove('token')
    Cookie.remove('expiry')

    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('expiry')
    }
  }
}

export const getters = {
  token: s => {
    return s.token
  },
  currentUser: s => {
    return s.currentUser
  }
}
