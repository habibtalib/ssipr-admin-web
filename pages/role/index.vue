<template>
  <div>
    <div class="columns">
      <div class="column is-full">
        <h1 class="has-text-weight-medium is-size-5">Senarai Peranan</h1>
      </div>
    </div>
    <div class="columns">
      <div class="column is-full">
        <b-field grouped>
          <b-input
            v-model="q.name"
            :placeholder="$t('f.name')"
            icon="certificate"
            expanded
          ></b-input>

          <no-ssr>
            <b-datepicker
              v-model="q.from_date"
              :date-parser="dateParser"
              icon="calendar-today"
              placeholder="Dari"
              expanded
            ></b-datepicker>

            <b-datepicker
              v-model="q.to_date"
              :date-parser="dateParser"
              icon="calendar-today"
              placeholder="Sehingga"
              expanded
            ></b-datepicker>
          </no-ssr>

          <p class="control">
            <b-button @click="search(q)" class="button is-primary"
              >Cari</b-button
            >
          </p>

          <p class="control">
            <b-button @click="openCreateModal()" class="button is-info">
              Tambah Baharu
            </b-button>
          </p>
        </b-field>
      </div>
    </div>
    <div class="columns">
      <div class="column is-full">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Nama</th>
              <th style="width: 15%;">Tarikh Dicipta</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="agency in roles.list" :key="agency.id">
              <td>
                <a @click="openSummaryModal(agency.id)">{{ agency.name }}</a>
              </td>
              <td>
                {{ agency.inserted_at }}
              </td>
            </tr>
          </tbody>
        </table>

        <b-pagination
          v-if="roles.list"
          :total="roles.pagination.total_entries"
          :current.sync="currentPage"
          :per-page="roles.pagination.page_size"
          @change="changePage"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        ></b-pagination>

        <b-modal :active.sync="createModalActive" :width="400" scroll="keep">
          <create-modal></create-modal>
        </b-modal>

        <b-modal
          v-if="selectedRole"
          :active.sync="summaryModalActive"
          scroll="keep"
        >
          <summary-modal></summary-modal>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import summaryModal from '~/components/role/summary_modal.vue'
import createModal from '~/components/role/create_modal.vue'

export default {
  middleware: ['check_admin_auth', 'admin_auth'],
  components: {
    summaryModal,
    createModal
  },
  data() {
    return {
      createModalActive: false,
      summaryModalActive: false,
      selectedRole: {},
      q: {
        name: '',
        from_date: new Date('2019-01-01'),
        to_date: new Date()
      },
      currentPage: 1
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'misc/isLoading',
      currentUser: 'admin_auth/currentUser',
      roles: 'role/roles'
    })
  },
  created() {
    this.$store.dispatch('admin_auth/setCurrentUser')
    this.$store.dispatch('role/setList')
    this.$store.dispatch('misc/setPathName', 'role')
  },
  methods: {
    queryParams() {
      const params = new URLSearchParams()

      params.append('page', this.currentPage)
      params.append('name', this.q.name)
      params.append('from_date', this.dateFormatter(this.q.from_date))
      params.append('to_date', this.dateFormatter(this.q.to_date))

      return params
    },
    search(query) {
      this.$store.dispatch('role/searchList', this.queryParams())
    },
    changePage(page) {
      this.currentPage = page
      this.$store.dispatch('role/setList', this.queryParams())
    },
    openSummaryModal(id) {
      this.setIsLoading(true)
      this.$store.dispatch('role/setRole', id).then(res => {
        this.setIsLoading(false)
        this.selectedRole = this.$store.getters['role/role']
        this.summaryModalActive = true
      })
    },
    openCreateModal() {
      this.createModalActive = true
    },
    dateParser(d) {
      return new Date(Date.parse(d))
    },
    dateFormatter(d) {
      const year = '' + d.getFullYear()
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [year, month, day].join('-')
    },
    setIsLoading(status) {
      this.$store.dispatch('misc/setIsLoading', status)
    }
  }
}
</script>

<style scoped>
.mt3rem {
  margin-top: 3rem;
}
.card-content.dashb {
  padding: 1rem;
}
h4.dashb {
  margin-bottom: 0;
}
</style>
