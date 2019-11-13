<template>
  <div class="columns">
    <div class="column">
      <h1 class="has-text-weight-semibold is-size-4">
        Kasih Ibu Smart Selangor
      </h1>

      <br />

      <form @submit.prevent="finalize()">
        <personal-fields
          :applicant="applicant"
          :residence="residence"
          :reset-value="resetValue"
        ></personal-fields>

        <residence-fields
          :applicant="applicant"
          :residence="residence"
        ></residence-fields>

        <article class="message is-dark">
          <div class="message-header">
            <p>Maklumat Pendapatan</p>
          </div>
          <fieldset disabled>
            <div class="message-body has-background-white">
              <div class="columns">
                <div class="column is-4">
                  <b-field label="Jumlah Pendapatan Pemohon">
                    <b-input></b-input>
                  </b-field>
                </div>
                <div class="column is-4">
                  <b-field label="Jumlah Pendapatan Pasangan">
                    <b-input></b-input>
                  </b-field>
                </div>
                <div class="column is-4">
                  <b-field label="Jumlah Pendapatan Isi Rumah (RM)">
                    <b-input></b-input>
                  </b-field>
                </div>
              </div>
            </div>
          </fieldset>
        </article>

        <article class="message is-dark">
          <div class="message-header">
            <p>Maklumat Pendapatan Suami</p>
          </div>
          <fieldset disabled>
            <div class="message-body has-background-white">
              <div class="columns">
                <div class="column is-4">
                  <b-field label="Jenis Pekerjaan">
                    <b-input></b-input>
                  </b-field>
                </div>
                <div class="column is-4">
                  <b-field label="Nama Majikan">
                    <b-input></b-input>
                  </b-field>
                </div>
                <div class="column is-4">
                  <b-field label="No Telefon Majikan">
                    <b-input></b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column is-4">
                  <b-field label="Jumlah Pendapatan">
                    <b-input></b-input>
                  </b-field>
                </div>
              </div>
            </div>
          </fieldset>
        </article>

        <article class="message is-dark">
          <div class="message-header">
            <p>
              MAKLUMAT ANAK-ANAK/TANGGUNGAN (berumur kurang daripada 21 tahun)
            </p>
          </div>
          <div class="message-body has-background-white">
            <fieldset v-for="child in childrens" :key="child.idx" disabled>
              <div class="columns">
                <div class="column is-4">
                  <b-field label="Nama Penuh">
                    <b-input></b-input>
                  </b-field>
                </div>
                <div class="column is-4">
                  <b-field label="No KP/Sijil Kelahiran">
                    <b-input></b-input>
                  </b-field>
                </div>
                <div class="column is-4">
                  <b-field label="Hubungan">
                    <b-input></b-input>
                  </b-field>
                </div>
              </div>
              <div class="columns">
                <div class="column is-4">
                  <b-field label="Umur">
                    <b-input></b-input>
                  </b-field>
                </div>
                <div class="column is-4">
                  <b-field label="Pendapatan Bulanan (RM) jika ada">
                    <b-input></b-input>
                  </b-field>
                </div>
              </div>
            </fieldset>
          </div>
        </article>

        <article class="message is-dark">
          <div class="message-header">
            <p>Jumlah Pendapatan Keseluruhan Isi Rumah</p>
          </div>
          <div class="message-body has-background-white">
            <fieldset disabled>
              <div class="columns">
                <div class="column is-4">
                  <b-field label="Jumlah Pendapatan (RM)">
                    <b-input></b-input>
                  </b-field>
                </div>
              </div>
            </fieldset>
          </div>
        </article>

        <article class="message is-dark">
          <div class="message-header">
            <p>
              PENGESAHAN MAKLUMAT (untuk diisi oleh Pejabat Ahli Dewan
              Negeri/Penyeleras Dewan Negeri atau SELCARE Management Sdn. Bhd.)
            </p>
          </div>
          <div class="message-body has-background-white">
            <fieldset>
              <div class="columns">
                <div class="column">
                  <b-checkbox v-model="setuju1">
                    Pemohon adalah pemilih berdaftar di Negeri Selangor
                  </b-checkbox>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <b-checkbox v-model="setuju2">
                    Pemohon menetap di Negeri Selangor melebihi 10 tahun - untuk
                    kelahiran di luar Negeri Selangor
                  </b-checkbox>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <b-checkbox v-model="setuju3">
                    Pendapatan bulanan isi rumah pemohon todak melebihi
                    RM2,000.00 - untuk bekerja sendiri/tidak bekerja
                  </b-checkbox>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <b-checkbox v-model="setuju4">
                    Penerima BSH bagi kategori pendapatan bawah RM2,000.00 atau
                    tersenarai sebagai golongan miskin/miskin tegar dalam
                    pengkalan data eKasih
                  </b-checkbox>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <b-field label="Name">
                    <b-input
                      v-model="name"
                      v-validate="'required'"
                      :value="currentUser.name"
                    ></b-input>
                  </b-field>
                  <b-field label="No. KP">
                    <b-input
                      v-model="nric"
                      v-validate="'required'"
                      :value="currentUser.name"
                    ></b-input>
                  </b-field>
                  <b-field label="Jawatan">
                    <b-input
                      v-model="position"
                      v-validate="'required'"
                      name="position"
                    ></b-input>
                  </b-field>
                  <b-field label="Tarikh Pengsahan">
                    <b-datepicker
                      v-model="validation_date"
                      icon="calendar-today"
                    >
                    </b-datepicker>
                  </b-field>
                </div>
              </div>
            </fieldset>
          </div>
        </article>

        <hr />

        <button
          type="submit"
          class="button is-primary is-fullwidth is-outlined"
        >
          Hantar
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Toast } from 'buefy/dist/components/toast'
import PersonalFields from '~/components/ipr/KISS/personal.vue'
import ResidenceFields from '~/components/ipr/KISS/residence.vue'
let idx = 1
export default {
  components: {
    PersonalFields,
    ResidenceFields
  },
  data() {
    return {
      residence: {
        individual_meter_acc_no: null,
        bulk_meter_acc_no: null,
        ownership_status: null,
        meter_type: null
      },
      childrens: [],
      name: null,
      nric: null,
      position: null,
      setuju1: null,
      setuju2: null,
      setuju3: null,
      setuju4: null,
      validation_date: null
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'admin_auth/currentUser',
      application: 'ipr_application/application'
    }),
    applicant() {
      return this.application && this.application.applicant
        ? this.application.applicant
        : {}
    }
  },
  created() {
    this.$store.dispatch('admin_auth/setCurrentUser')
    this.$store.dispatch(
      'ipr_application/setApplication',
      this.$route.params.id
    )
  },
  methods: {
    finalize() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isSummaryModalActive = true
          Toast.open({
            duration: 5000,
            message: 'Proses Pengesahan Berjaya.',
            type: 'is-info'
          })
          this.$router.push('/account')
        } else {
          Toast.open({
            duration: 5000,
            message: 'Maklumat tidak lengkap. Sila semak.',
            type: 'is-danger'
          })
        }
      })
    },
    setIsLoading(status) {
      this.$store.dispatch('misc/setIsLoading', status)
    },
    sumSpousesSalaries(items, prop) {
      if (!items) {
        return 0
      }
      const x = items.reduce((a, b) => parseFloat(a) + parseFloat(b[prop]), 0)
      return x
    },
    addChild() {
      const newChild = {
        idx: idx,
        ic: null,
        name: null,
        income: null,
        tele_no: null,
        email: null
      }
      this.childrens.push(newChild)
      idx++
    },
    removeChild(child) {
      this.childrens.splice(this.childrens.indexOf(child), 1)
    },
    resetValue(field) {
      switch (field) {
        case 'marital_status':
          if (this.applicant.marital_status === 'Berkahwin') {
            this.spouses = [
              {
                idx: 1,
                ic: null,
                name: null,
                income: null,
                tele_no: null,
                email: null
              }
            ]
            this.childs = []
          } else {
            this.spouses = []
            this.childs = []
          }
          break
        case 'ic_type':
          this.applicant.ic = null
          break
        case 'email_owner':
          this.applicant.email = null
          break
        case 'meter_type':
          this.residence.individual_meter_acc_no = null
          this.residence.bulk_meter_acc_no = null
          this.jmb_confirmation.jmb_name = null
          this.jmb_confirmation.jmb_email = null
          this.jmb_confirmation.tele_no = null
          this.jmb_confirmation.jmb_rep_position = null
          this.jmb_confirmation.jmb_rep_name = null
          this.jmb_confirmation.bulk_meter_no = null
          this.jmb_confirmation.jmb_serial_no = null
          this.jmb_confirmation.confirmation_date = null
          break
        default:
        // DO NOTHING
      }
    },
    fixedTwoDecimal(n) {
      if (!n) {
        return 0
      }
      return n.toFixed(2)
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
    }
  }
}
</script>
