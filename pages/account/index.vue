<template>
  <div>
    <div class="columns">
      <div class="column is-4">
        <div class="card">
          <div class="card-content dashb">
            <div class="content has-text-centered">
              <h4 class="dashb has-text-weight-light">
                {{
                  applications.pagination
                    ? applications.pagination.total_entries
                    : 0
                }}
                Jumlah Permohonan
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <div class="card">
          <div class="card-content dashb">
            <div class="content has-text-centered">
              <h4 class="dashb has-text-weight-light">
                0 Permohonan Diluluskan
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <div class="card">
          <div class="card-content dashb">
            <div class="content has-text-centered">
              <h4 class="dashb has-text-weight-light">0 Permohonan Ditolak</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-full">
        <b-field grouped>
          <b-input
            v-model="q.ic"
            :placeholder="$t('f.ic')"
            icon="account"
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
            <b-button @click="exportList()" class="button is-success"
              >Eksport</b-button
            >
          </p>
        </b-field>
      </div>
    </div>
    <div class="columns">
      <div class="column is-full">
        <h1 class="has-text-weight-medium is-size-5">Senarai Permohonan</h1>
      </div>
    </div>
    <div class="columns">
      <div class="column is-full">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>ID Doket</th>
              <th>Pemohon</th>
              <th
                v-if="
                  currentUser &&
                    currentUser.agency &&
                    currentUser.agency.id === 1
                "
              >
                Jenis Meter
              </th>
              <th v-else>IPR</th>
              <th>Tarikh Permohonan</th>
              <th>Status</th>
              <th>Tindakan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="application in applications.list" :key="application.id">
              <td>
                <a @click="openSummaryModal(application.id)"
                  >IPR{{ application.id }}</a
                >
              </td>
              <td>{{ application.applicant.name.toUpperCase() }}</td>
              <td
                v-if="
                  currentUser &&
                    currentUser.agency &&
                    currentUser.agency.id === 1
                "
              >
                {{
                  application.residence && application.residence.meter_type
                    ? application.residence.meter_type.toUpperCase()
                    : ''
                }}
              </td>
              <td v-else>{{ application.ipr_code }}</td>
              <td>{{ application.inserted_at }}</td>
              <td>
                {{ humanizeUpcasingString(application.status) }}
              </td>
              <td>
                <span @click="viewDetail(application)">
                  <b-icon size="is-small" icon="pencil"></b-icon
                ></span>
              </td>
            </tr>
          </tbody>
        </table>

        <b-pagination
          v-if="applications.list"
          :total="applications.pagination.total_entries"
          :current.sync="currentPage"
          :per-page="applications.pagination.page_size"
          @change="changePage"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        ></b-pagination>

        <b-modal
          v-if="selectedApplication"
          :active.sync="isSummaryModalActive"
          scroll="keep"
        >
          <div id="printSummary" class="card">
            <div class="card-content">
              <div class="content">
                <form-summary
                  :applicant="selectedApplication.applicant"
                  :jmb-confirmation="selectedApplication.jmb_confirmation"
                  :residence="selectedApplication.residence"
                  :spouses="selectedApplication.applicant.spouses"
                  :data="selectedApplication.data"
                  :all="selectedApplication"
                  :total-spouses-salaries="
                    sumSpousesSalaries(
                      selectedApplication.applicant.spouses,
                      'income'
                    )
                  "
                  :application-status="
                    humanizeUpcasingString(selectedApplication.status)
                  "
                ></form-summary>
              </div>
            </div>
            <footer class="card-footer hide-p">
              <a @click="print" class="card-footer-item">Cetak</a>
            </footer>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FormSummary from '~/components/ipr/SADE/summary.vue'

export default {
  middleware: ['check_admin_auth', 'admin_auth'],
  components: {
    FormSummary
  },
  data() {
    return {
      isSearchModalActive: false,
      isSummaryModalActive: false,
      selectedApplication: null,
      q: {
        ic: '',
        from_date: new Date('2019-01-01'),
        to_date: new Date()
      },
      currentPage: 1
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'admin_auth/currentUser',
      applications: 'ipr_application/applications'
    }),
    applicationList() {
      return this.applications.list.filter(item => {
        return item.ipr_code === 'AIR_SELANGOR'
      })
    }
  },
  created() {
    this.$store.dispatch('admin_auth/setCurrentUser')
    this.$store.dispatch('ipr_application/setList', this.queryParams())
    this.$store.dispatch('misc/setPathName', 'dashboard')
  },
  methods: {
    viewDetail(application) {
      // this.$router.push('/application/' + application.id)
      this.$router.push('/ipr/SADE/' + application.id)
    },
    queryParams() {
      const params = new URLSearchParams()

      params.append('page', this.currentPage)
      params.append('ic', this.q.ic)
      params.append('ipr_code', 'AIR_SELANGOR')
      params.append('from_date', this.dateFormatter(this.q.from_date))
      params.append('to_date', this.dateFormatter(this.q.to_date))

      return params
    },
    search(query) {
      this.$store.dispatch('ipr_application/searchList', this.queryParams())
    },
    changePage(page) {
      this.currentPage = page
      this.$store.dispatch('ipr_application/setList', this.queryParams())
    },
    openSummaryModal(id) {
      this.selectedApplication = new Map()
      this.selectedApplication.set(
        'data',
        this.applications.list.find(a => a.id === id)
      )
      this.selectedApplication = this.selectedApplication.get('data')
      this.isSummaryModalActive = true
    },
    sumSpousesSalaries(items, prop) {
      const x = items.reduce((a, b) => parseFloat(a) + parseFloat(b[prop]), 0)
      return x
    },
    exportList() {
      this.$store.dispatch('ipr_application/exportList', this.queryParams())
    },
    print() {
      const prtHtml = document.getElementById('printSummary').innerHTML
      let stylesHtml = ''

      for (const node of [
        ...document.querySelectorAll('link[rel="stylesheet"], style')
      ]) {
        stylesHtml += node.outerHTML
      }

      const WinPrint = window.open(
        '',
        '',
        'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0'
      )

      WinPrint.document.write(
        `<!DOCTYPE html>
        <html>
          <head>
            ${stylesHtml}
          </head>
          <body>
            ${prtHtml}
          </body>
        </html>`
      )

      WinPrint.document.close()
      WinPrint.focus()
      WinPrint.print()
      WinPrint.close()
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
    humanizeUpcasingString(str) {
      return str
        .replace(/_id$/, '')
        .replace(/_/g, ' ')
        .toUpperCase()
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
