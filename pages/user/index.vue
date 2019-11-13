<template>
  <div>
    <div class="columns">
      <div class="column is-full">
        <h1 class="has-text-weight-medium is-size-5">Senarai Admin</h1>
      </div>
    </div>
    <div class="columns">
      <div class="column is-full">
        <b-field grouped>
          <b-input
            v-model="q.name"
            icon="certificate"
            :placeholder="$t('f.name')"
            expanded
          ></b-input>

          <p class="control">
            <b-button class="button is-primary" @click="search(q)"
              >Cari</b-button
            >
          </p>

          <p class="control">
            <b-button class="button is-info" @click="openCreateModal()">
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
              <th>Email</th>
              <th>Agensi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="admin in admins.list" :key="admin.id_admin">
              <td>
                <a @click="openSummaryModal(admin.id_admin)">{{
                  admin.name
                }}</a>
              </td>
              <td>
                {{ admin.email }}
              </td>
              <td>
                {{ admin.agency.name }}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- <b-pagination
          v-if="admins.list"
          :total="admins.pagination.total_entries"
          :current.sync="currentPage"
          :per-page="admins.pagination.page_size"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
          @change="changePage"
        ></b-pagination> -->

        <b-modal :active.sync="createModalActive" scroll="keep" :width="400">
          <create-modal :roles="roles" :agencies="agencies"></create-modal>
        </b-modal>

        <b-modal
          v-if="selectedAdmin"
          :active.sync="summaryModalActive"
          scroll="keep"
        >
          <summary-modal :selected-admin="selectedAdmin"></summary-modal>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import summaryModal from '~/components/admin/summary_modal.vue'
import createModal from '~/components/admin/create_modal.vue'

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
      selectedAdmin: {},
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
      admins: 'admin/admins',
      roles: 'role/roles',
      agencies: 'agency/agencies'
    })
  },
  created() {
    this.$store.dispatch('admin_auth/setCurrentUser')
    this.$store.dispatch('admin/setList')
    this.$store.dispatch('agency/setList')
    this.$store.dispatch('role/setList')
    this.$store.dispatch('misc/setPathName', 'user')
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
      this.$store.dispatch('admin/searchList', this.queryParams())
    },
    changePage(page) {
      this.currentPage = page
      this.$store.dispatch('admin/setList', this.queryParams())
    },
    openSummaryModal(id) {
      this.setIsLoading(true)
      this.$store.dispatch('admin/setAdmin', id).then(res => {
        this.setIsLoading(false)
        this.selectedAdmin = this.$store.getters['admin/admin']
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
