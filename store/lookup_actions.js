export const mutations = {
  setReligions(s, p) {
    s.religions = p
  },
  setDistricts(s, p) {
    s.districts = p
  },
  setCountryStates(s, p) {
    s.countryStates = p
  },
  setMaritalStatuses(s, p) {
    s.religions = p
  },
  setSchoolingStatuses(s, p) {
    s.maritalStatuses = p
  },
  setGenders(s, p) {
    s.genders = p
  }
}

export const actions = {
  setReligions({ commit }) {
    commit('setReligions', [
      'Islam',
      'Kristian',
      'Hindu',
      'Buddha',
      'Lain-lain'
    ])
  },
  setDistricts({ commit }) {
    commit('setDistricts', [
      'Gombak',
      'Hulu Langat',
      'Hulu Selangor',
      'Klang',
      'Kuala Langat',
      'Kuala Selangor',
      'Petaling',
      'Sabak Bernam',
      'Sepang',
      'Lain-lain'
    ])
  },
  setCountryStates({ commit }) {
    commit('setCountryStates', [
      'Selangor',
      'Johor',
      'Kedah',
      'Kelantan',
      'Melaka',
      'Negeri Sembilan',
      'Pahang',
      'Pulau Pinang',
      'Perak',
      'Perlis',
      'Sabah',
      'Sarawak',
      'Terengganu'
    ])
  },
  setMaritalStatuses({ commit }) {
    commit('setMaritalStatuses', ['Bujang', 'Berkahwin', 'Duda / Janda'])
  },
  setSchoolingStatuses({ commit }) {
    commit('setSchoolingStatuses', ['Rendah', 'Menengah', 'Universiti'])
  },
  setGenders({ commit }) {
    commit('setReligions', ['Lelaki', 'Perempuan'])
  }
}
