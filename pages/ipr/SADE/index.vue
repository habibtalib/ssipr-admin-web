<template>
  <div class="columns">
    <div class="column">
      <h1 class="has-text-weight-semibold is-size-4">
        Skim Air Darul Ehsan
      </h1>

      <br />

      <form @submit.prevent="finalize()">
        <personal-fields
          :applicant="applicant"
          :residence="residence"
          :reset-value="resetValue"
        ></personal-fields>

        <spouses-fields
          v-if="applicant.marital_status == 'Berkahwin'"
          :spouses="spouses"
        ></spouses-fields>

        <article class="message is-dark">
          <div class="message-header">
            <p>Maklumat Pendapatan</p>
          </div>
          <div class="message-body has-background-white">
            <div class="columns">
              <div class="column is-4">
                <b-field label="Jumlah Pendapatan Pemohon">
                  <b-input
                    :value="applicant.income"
                    type="number"
                    disabled
                  ></b-input>
                </b-field>
              </div>
              <div class="column is-4">
                <b-field label="Jumlah Pendapatan Pasangan">
                  <b-input
                    :value="
                      fixedTwoDecimal(sumSpousesSalaries(spouses, 'income'))
                    "
                    type="number"
                    disabled
                  ></b-input>
                </b-field>
              </div>
              <div class="column is-4">
                <b-field label="Jumlah Pendapatan Isi Rumah (RM)">
                  <b-input
                    :value="
                      fixedTwoDecimal(
                        parseFloat(applicant.income) +
                          sumSpousesSalaries(spouses, 'income')
                      )
                    "
                    type="number"
                    disabled
                  ></b-input>
                </b-field>
              </div>
            </div>
          </div>
        </article>

        <residence-fields
          :applicant="applicant"
          :residence="residence"
        ></residence-fields>

        <jmb-fields
          v-if="residence.meter_type == 'pukal'"
          :jmb-confirmation="jmb_confirmation"
          :residence="residence"
        ></jmb-fields>

        <hr />

        <button
          type="submit"
          class="button is-primary is-fullwidth is-outlined"
        >
          Hantar
        </button>

        <b-modal :active.sync="isSummaryModalActive" scroll="keep">
          <div id="printSummary" class="card">
            <div class="card-content">
              <div class="content">
                <form-summary
                  :applicant="applicant"
                  :jmb-confirmation="jmb_confirmation"
                  :residence="residence"
                  :spouses="spouses"
                  :total-spouses-salaries="
                    fixedTwoDecimal(sumSpousesSalaries(spouses, 'income'))
                  "
                  :total-salaries="
                    fixedTwoDecimal(
                      parseFloat(applicant.income) +
                        sumSpousesSalaries(spouses, 'income')
                    )
                  "
                ></form-summary>

                <div class="is-divider" data-content="Perakuan Pemohon"></div>

                <article class="message is-warning">
                  <div class="message-body">
                    Sila ambil perhatian bahawa Akta Perlindungan Data Peribadi
                    2010 memberi anda hak tertentu ke atas penggunaan data
                    peribadi anda oleh pihak kami. Kerajaan Negeri Selangor dan
                    Pengurusan Air Selangor Sdn. Bhd. memberi keutamaan dalam
                    hal melindungi data peribadi anda dan memastikan ianya
                    terpelihara dengan mengambil langkah tertentu seperti yang
                    termaktub di dalam akta tersebut. Dengan mengemukakan dan
                    menyediakan maklumat anda kepada kami di dalam borang
                    pendaftaran ini, anda membenarkan penggunaan maklumat
                    peribadi yang dikumpulkan untuk memberikan perkhidmatan
                    kami, mengikut cara dan tujuan yang dinyatakan dalam nota
                    privasi kami. Sila rujuk nota privasi di laman sesawang
                    <a href="https://www.airselangor.com" target="_blank"
                      >www.airselangor.com
                    </a>
                    .
                  </div>
                </article>

                <div class="field">
                  <b-checkbox v-model="setuju1">
                    Setuju
                  </b-checkbox>
                </div>

                <article class="message is-warning">
                  <div class="message-body">
                    Saya dengan ini mengakui bahawa segala maklumat yang
                    dinyatakan di dalam Borang Permohonan ini adalah
                    <strong>BENAR</strong> dan memberikan kebenaran kepada
                    Kerajaan Negeri Selangor dan pihak Air Selangor untuk
                    membuat semakan data butir-butir peribadi saya bagi
                    memproses permohonan ini.
                  </div>
                </article>

                <div class="field">
                  <b-checkbox v-model="setuju2">
                    Setuju
                  </b-checkbox>
                </div>
              </div>
            </div>
            <footer class="card-footer hide-p">
              <a
                @click="isSummaryModalActive = !isSummaryModalActive"
                class="card-footer-item"
              >
                Kemas Kini
              </a>
              <a @click="print" class="card-footer-item">
                Cetak
              </a>
              <a
                v-if="setuju1 && setuju2"
                @click="create()"
                class="card-footer-item"
              >
                Hantar
              </a>
            </footer>
          </div>
        </b-modal>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Toast } from 'buefy/dist/components/toast'
import PersonalFields from '~/components/ipr/SADE/personal.vue'
import SpousesFields from '~/components/account/forms/spouses.vue'
import ResidenceFields from '~/components/ipr/SADE/residence.vue'
import JmbFields from '~/components/ipr/SADE/jmb.vue'
import FormSummary from '~/components/ipr/SADE/summary.vue'

export default {
  middleware: ['check_admin_auth', 'admin_auth'],
  components: {
    PersonalFields,
    SpousesFields,
    ResidenceFields,
    JmbFields,
    FormSummary
  },
  data() {
    return {
      setuju1: null,
      setuju2: null,
      spouses: [],
      // applicant: {
      //   name: null,
      //   email: null,
      //   is_using_rep_email: false,
      //   ic_type: 0,
      //   ic: null,
      //   marital_status: null,
      //   income: 0,
      //   phone_no: null,
      //   address_1: null,
      //   address_2: null,
      //   address_3: null,
      //   postcode: null,
      //   district: null,
      //   state: null,
      //   by_admin: true
      // },
      residence: {
        individual_meter_acc_no: null,
        bulk_meter_acc_no: null,
        ownership_status: null,
        meter_type: null
      },
      jmb_confirmation: {
        jmb_name: null,
        jmb_email: null,
        tele_no: null,
        jmb_rep_position: null,
        jmb_rep_name: null,
        bulk_meter_no: null,
        jmb_serial_no: null,
        confirmation_date: null
      },
      isSummaryModalActive: false
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
    this.$store.dispatch('misc/setPathName', 'ipr/SADE')
  },
  methods: {
    finalize() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.isSummaryModalActive = true
        } else {
          Toast.open({
            duration: 5000,
            message: 'Maklumat tidak lengkap. Sila semak.',
            type: 'is-danger'
          })
        }
      })
    },
    create() {
      this.setIsLoading(true)
      this.$store
        .dispatch('ipr_application/create', {
          docket: {
            ipr_code: 'AIR_SELANGOR',
            by_admin: true,
            applicant: {
              name: this.applicant.name,
              email: this.applicant.is_using_rep_email
                ? null
                : this.applicant.email,
              rep_email: this.applicant.is_using_rep_email
                ? this.applicant.email
                : null,
              ic_type: this.applicant.ic_type,
              ic: this.applicant.ic.toUpperCase(),
              marital_status: this.applicant.marital_status,
              income: this.applicant.income,
              phone_no: this.applicant.phone_no,
              address_1: this.applicant.address_1,
              address_2: this.applicant.address_2,
              address_3: this.applicant.address_3,
              postcode: this.applicant.postcode,
              state: this.applicant.state,
              by_admin: true,
              spouses: this.spouses
            },
            residence: {
              meter_type: this.residence.meter_type,
              individual_meter_acc_no: this.residence.individual_meter_acc_no,
              bulk_meter_acc_no: this.residence.bulk_meter_acc_no,
              ownership_status: this.residence.ownership_status
            },
            jmb_confirmation:
              this.residence.meter_type === 'pukal'
                ? {
                    jmb_name: this.jmb_confirmation.jmb_name,
                    jmb_email: this.jmb_confirmation.jmb_email,
                    tele_no: this.jmb_confirmation.tele_no,
                    jmb_rep_position: this.jmb_confirmation.jmb_rep_position,
                    jmb_rep_name: this.jmb_confirmation.jmb_rep_name,
                    bulk_meter_no: this.jmb_confirmation.bulk_meter_no,
                    jmb_serial_no: this.jmb_confirmation.jmb_serial_no,
                    confirmation_date: this.jmb_confirmation.confirmation_date
                  }
                : null
          }
        })
        .then(res => {
          this.setIsLoading(false)

          if (res.error) {
            const errors = []

            for (const key in res.errors) {
              if (res.errors.hasOwnProperty.call(key)) {
                for (const subKey in res.errors[key]) {
                  errors.push(
                    key +
                      ' ' +
                      subKey +
                      ' ' +
                      res.errors[key][subKey].join(', ')
                  )
                }
              }
            }

            Toast.open({
              duration: 5000,
              message: errors.join(', '),
              type: 'is-danger'
            })
          } else {
            Toast.open({
              duration: 5000,
              message: `Permohonan berjaya dihantar.`,
              type: 'is-success'
            })
            this.$router.push('/account')
          }
        })
    },
    setIsLoading(status) {
      this.$store.dispatch('misc/setIsLoading', status)
    },
    sumSpousesSalaries(items, prop) {
      const x = items.reduce((a, b) => parseFloat(a) + parseFloat(b[prop]), 0)
      return x
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
.mtauto {
  margin-top: auto;
}
</style>
