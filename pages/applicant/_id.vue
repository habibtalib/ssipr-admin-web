<template>
  <div class="columns">
    <div class="column">
      <h1 class="has-text-weight-semibold is-size-4">
        Profile
      </h1>

      <br />

      <form @submit.prevent="finalize()">
        <personal-fields
          v-if="applicant"
          :applicant="applicant"
          :reset-value="resetValue"
        ></personal-fields>

        <spouses-fields
          v-if="applicant && applicant.marital_status == 'Berkahwin'"
          :spouses="spouses"
        ></spouses-fields>

        <residence-fields
          v-if="applicant"
          :applicant="applicant"
        ></residence-fields>
        <hr />

        <button
          type="submit"
          class="button is-primary is-fullwidth is-outlined"
        >
          Kemaskini
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { Toast } from 'buefy/dist/components/toast'
import { mapGetters } from 'vuex'
import { Dialog } from 'buefy/dist/components/dialog'
import PersonalFields from '~/components/applicant/personal.vue'
import SpousesFields from '~/components/account/forms/spouses.vue'
import ResidenceFields from '~/components/applicant/residence.vue'
export default {
  middleware: ['check_admin_auth', 'admin_auth'],
  components: {
    PersonalFields,
    SpousesFields,
    ResidenceFields
  },
  data() {
    return {
      isSummaryModalActive: false
    }
  },
  computed: {
    ...mapGetters({
      applicant: 'applicant/applicant'
    })
  },
  created() {
    this.$store.dispatch('applicant/setApplicant', this.$route.params.id)
  },
  methods: {
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
    finalize() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.setIsLoading(true)
          this.applicant.dob.setDate(this.applicant.dob.getDate() + 1)
          let i
          for (i = 0; i < this.applicant.childrens.length; i++) {
            this.applicant.childrens[i].dob.setDate(
              this.applicant.childrens[i].dob.getDate() + 1
            )
          }
          this.$store
            .dispatch('applicant/update', {
              applicant: this.applicant
            })
            .then(res => {
              this.setIsLoading(false)

              if (res.error) {
                const errors = []

                for (const k in res.errors) {
                  if ({}.hasOwnProperty.call(res.errors, k)) {
                    errors.push(k + ' ' + res.errors[k].join(', '))
                  }
                }

                Dialog.alert({
                  message: errors.join(', '),
                  type: 'is-danger',
                  hasIcon: true,
                  icon: 'times-circle',
                  iconPack: 'fa'
                })
              } else {
                Dialog.alert({
                  message: 'Maklumat profil berjaya dikemaskini.',
                  type: 'is-success',
                  hasIcon: true,
                  icon: 'check-circle',
                  iconPack: 'fa'
                })
                this.isEditing = false
                window.scrollTo(0, 0)
              }
            })
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
      if (items) {
        const x = items.reduce((a, b) => parseFloat(a) + parseFloat(b[prop]), 0)
        return x
      } else {
        return 0
      }
    },
    fixedTwoDecimal(n) {
      return n.toFixed(2)
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
