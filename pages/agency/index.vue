<template>
  <div>
    <div class="columns">
      <div class="column is-full">
        <h1 class="has-text-weight-medium is-size-5">Senarai Agensi</h1>
      </div>
    </div>
    <div class="columns">
      <div class="column is-full">
        <b-field grouped>
          <b-input
            v-model="q.name"
            :placeholder="$t('f.name')"
            icon="home"
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
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Nama</th>
              <th style="width: 15%;">Tarikh Dicipta</th>
              <th style="width: 15%;">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="agency in agencies.list" :key="agency.id">
              <td>
                <a @click="openSummaryModal(agency.id)">{{ agency.name }}</a>
              </td>
              <td>
                {{ agency.inserted_at }}
              </td>
              <td>
                {{ humanizeUpcasingString(agency.status) }}
              </td>
            </tr>
          </tbody>
        </table>

        <b-pagination
          v-if="agencies.list"
          :total="agencies.pagination.total_entries"
          :current.sync="currentPage"
          :per-page="agencies.pagination.page_size"
          @change="changePage"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        ></b-pagination>

        <b-modal
          v-if="selectedAgency"
          :active.sync="isSummaryModalActive"
          scroll="keep"
        >
          <div id="printSummary" class="card">
            <div class="card-content">
              <div class="content">
                {{ selectedAgency }}
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

export default {
  middleware: ['check_admin_auth', 'admin_auth'],
  data() {
    return {
      isSearchModalActive: false,
      isSummaryModalActive: false,
      selectedAgency: null,
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
      agencies: 'agency/agencies'
    })
  },
  created() {
    this.$store.dispatch('admin_auth/setCurrentUser')
    this.$store.dispatch('agency/setList')
    this.$store.dispatch('misc/setPathName', 'agency')
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
      this.$store.dispatch('agency/searchList', this.queryParams())
    },
    changePage(page) {
      this.currentPage = page
      this.$store.dispatch('agency/setList', this.queryParams())
    },
    openSummaryModal(id) {
      this.setIsLoading(true)
      this.$store.dispatch('agency/setAgency', id).then(res => {
        this.setIsLoading(false)
        this.selectedAgency = this.$store.getters['agency/agency']
        this.isSummaryModalActive = true
      })
    },
    exportList() {
      this.$store.dispatch('agency/exportList', this.queryParams())
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
    setIsLoading(status) {
      this.$store.dispatch('misc/setIsLoading', status)
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
