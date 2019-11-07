export const state = () => ({
  religions: ['Islam', 'Kristian', 'Hindu', 'Buddha', 'Lain-lain'],
  maritalStatuses: ['Bujang', 'Berkahwin', 'Duda / Janda'],
  schoolingStatuses: ['Rendah', 'Menengah', 'Universiti', 'Lain - lain'],
  genders: ['Lelaki', 'Perempuan'],
  districts: [
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
  ],
  countryStates: [
    'Selangor',
    'Johor',
    'Kedah',
    'Kelantan',
    'Melaka',
    'Negeri Sembilan',
    'Pahang',
    'Perak',
    'Perlis',
    'Pulau Pinang',
    'Sabah',
    'Sarawak',
    'Terengganu',
    'Wilayah Persekutuan Kuala Lumpur',
    'Wilayah Persekutuan Labuan',
    'Wilayah Persekutuan Putrajaya'
  ],
  icTypes: ['No. Kad Pengenalan', 'No. Polis', 'No. Tentera']
})

export const getters = {
  religions: s => {
    return s.religions
  },
  districts: s => {
    return s.districts
  },
  countryStates: s => {
    return s.countryStates
  },
  maritalStatuses: s => {
    return s.maritalStatuses
  },
  schoolingStatuses: s => {
    return s.schoolingStatuses
  },
  genders: s => {
    return s.genders
  },
  icTypes: s => {
    return s.icTypes
  }
}
