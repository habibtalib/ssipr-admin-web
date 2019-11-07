<template>
  <div>
    <div v-if="application" class="columns">
      <div class="column">
        <h1 class="has-text-weight-semibold is-size-4">
          Skim Air Darul Ehsan
        </h1>

        <br />

        <article class="message is-dark">
          <div class="message-header">
            <p>Maklumat Pemohon {{ application.jmb_confirmation.id }}</p>
          </div>
          <div class="message-body has-background-white">
            <div class="columns">
              <div class="column">
                <table class="table is-fullwidth is-bordered">
                  <thead>
                    <tr>
                      <th>Nama</th>
                      <th>E-mel</th>
                      <th>No Telefon</th>
                      <th>Alamat</th>
                      <th>Tarikh Permohonan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ application.applicant.name }}</td>
                      <td>{{ application.applicant.email }}</td>
                      <td>{{ application.applicant.phone_no }}</td>
                      <td>
                        {{
                          [
                            application.applicant.address_1,
                            application.applicant.address_2,
                            application.applicant.address_3,
                            application.applicant.postcode,
                            application.applicant.district,
                            application.applicant.state
                          ]
                            .filter(x => x)
                            .join(', ')
                        }}
                      </td>
                      <td>{{ application.inserted_at }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </article>

        <form @submit.prevent="update()">
          <article class="message is-dark">
            <div class="message-header">
              <p>
                Maklumat Badan Pengurusan Bersama (JMB) / Perbadanan Pengurusan
                (MC)
              </p>
            </div>
            <div class="message-body has-background-white">
              <div class="columns">
                <div class="column is-half">
                  <b-field :label="$t('f.jmbName')">
                    <b-input
                      :value="application.jmb_confirmation.jmb_name"
                      :disabled="true"
                    ></b-input>
                  </b-field>

                  <b-field :label="$t('f.jmbEmail')">
                    <b-input
                      :value="application.jmb_confirmation.jmb_email"
                      :disabled="true"
                    ></b-input>
                  </b-field>

                  <b-field :label="$t('f.noTeleJMB')">
                    <b-input
                      :value="application.jmb_confirmation.tele_no"
                      :disabled="true"
                    ></b-input>
                  </b-field>

                  <b-field
                    :label="$t('f.jmbRep')"
                    :type="{ 'is-danger': errors.has('jmbRep') }"
                    :message="errors.first('jmbRep')"
                  >
                    <b-input
                      v-model="jmb_confirmation.jmb_rep_name"
                      v-validate="{ required: true, regex: /^[ A-Za-z@'/-]*$/ }"
                      name="jmbRep"
                    ></b-input>
                  </b-field>

                  <b-field
                    :label="$t('f.jmbRepPost')"
                    :type="{ 'is-danger': errors.has('jmbRepPost') }"
                    :message="errors.first('jmbRepPost')"
                  >
                    <b-input
                      v-model="jmb_confirmation.jmb_rep_position"
                      v-validate="'required'"
                      name="jmbRepPost"
                    ></b-input>
                  </b-field>
                </div>
                <div class="column is-half">
                  <b-field
                    :label="$t('f.status')"
                    :type="{ 'is-danger': errors.has('applicationStatus') }"
                    :message="errors.first('applicationStatus')"
                  >
                    <div>
                      <b-radio
                        v-model="docket.status"
                        v-validate="'required'"
                        native-value="disemak"
                        name="applicationStatus"
                        @input="resetValue('applicationStatus')"
                        >Terima</b-radio
                      >
                      <b-radio
                        v-model="docket.status"
                        v-validate="'required'"
                        native-value="gagal"
                        name="applicationStatus"
                        @input="resetValue('applicationStatus')"
                        >Tolak</b-radio
                      >
                    </div>
                  </b-field>

                  <template v-if="docket.status == 'disemak'">
                    <b-field
                      :label="$t('f.pukalAccNo')"
                      :type="{
                        'is-danger': errors.has('residenceBulkAccountNo')
                      }"
                      :message="errors.first('residenceBulkAccountNo')"
                    >
                      <b-input
                        key="residenceBulkAccountNo"
                        v-model="residence.bulk_meter_acc_no"
                        v-validate="'required|numeric'"
                        name="residenceBulkAccountNo"
                      ></b-input>
                    </b-field>

                    <b-field
                      :label="$t('f.bulkMeterNo')"
                      :type="{ 'is-danger': errors.has('jmbBulkMeterNo') }"
                      :message="errors.first('jmbBulkMeterNo')"
                    >
                      <b-input
                        key="jmbBulkMeterNo"
                        v-model="jmb_confirmation.bulk_meter_no"
                        v-validate="'required'"
                        name="jmbBulkMeterNo"
                      ></b-input>
                    </b-field>

                    <b-field
                      :label="$t('f.jmbSerialNo')"
                      :type="{ 'is-danger': errors.has('jmbSerialNo') }"
                      :message="errors.first('jmbSerialNo')"
                    >
                      <b-input
                        key="jmbSerialNo"
                        v-model="jmb_confirmation.jmb_serial_no"
                        v-validate="'required'"
                        name="jmbSerialNo"
                      ></b-input>
                    </b-field>
                  </template>

                  <b-field
                    v-if="docket.status == 'gagal'"
                    :label="$t('f.reasonRejected')"
                    :type="{ 'is-danger': errors.has('jmbRemark') }"
                    :message="errors.first('jmbRemark')"
                  >
                    <b-input
                      key="jmbRemark"
                      v-model="jmb_confirmation.remark"
                      v-validate="'required'"
                      name="jmbRemark"
                    ></b-input>
                  </b-field>

                  <b-field
                    v-if="docket.status != null"
                    :label="$t('f.confirmDate')"
                    :type="{ 'is-danger': errors.has('jmbConfirmDate') }"
                    :message="errors.first('jmbConfirmDate')"
                  >
                    <b-datepicker
                      key="jmbConfirmDate"
                      v-model="jmb_confirmation.confirmation_date"
                      v-validate="'required'"
                      icon="calendar-today"
                      name="jmbConfirmDate"
                    ></b-datepicker>
                  </b-field>
                </div>
              </div>
              <hr />

              <button
                type="submit"
                class="button is-primary is-fullwidth is-outlined"
              >
                Hantar
              </button>
            </div>
          </article>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Toast } from 'buefy'

export default {
  layout: 'unverified',
  data() {
    return {
      docket: {
        status: null
      },
      residence: {
        bulk_meter_acc_no: null
      },
      jmb_confirmation: {
        jmb_rep_position: null,
        jmb_rep_name: null,
        bulk_meter_no: null,
        jmb_serial_no: null,
        confirmation_date: null,
        remark: null
      }
    }
  },
  computed: {
    ...mapGetters({
      application: 'ipr_application/application'
    })
  },
  created() {
    this.$store.dispatch(
      'ipr_application/setApplicationFromToken',
      this.$route.query.token
    )
  },
  methods: {
    update() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.setIsLoading(true)
          this.$store
            .dispatch('ipr_application/update', {
              docket: {
                id: this.application.id,
                status: this.docket.status,
                residence: {
                  id: this.application.residence.id,
                  bulk_meter_acc_no: this.residence.bulk_meter_acc_no
                },
                jmb_confirmation: {
                  id: this.application.jmb_confirmation.id,
                  jmb_rep_position: this.jmb_confirmation.jmb_rep_position,
                  jmb_rep_name: this.jmb_confirmation.jmb_rep_name,
                  bulk_meter_no: this.jmb_confirmation.bulk_meter_no,
                  jmb_serial_no: this.jmb_confirmation.jmb_serial_no,
                  confirmation_date: this.jmb_confirmation.confirmation_date,
                  remark: this.jmb_confirmation.remark
                }
              }
            })
            .then(res => {
              this.setIsLoading(false)

              if (res.error) {
                const errors = []

                for (const key in res.errors) {
                  if (res.errors.hasOwnProperty(key)) {
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
                  message: `Pengesahan JMB telah berjaya dihantar`,
                  type: 'is-success'
                })

                this.$router.push('/')
              }
            })
        } else {
          Toast.open({
            duration: 5000,
            message: `Maklumat tidak lengkap. Sila semak.`,
            type: 'is-danger'
          })
        }
      })
    },
    resetValue(field) {
      switch (field) {
        case 'applicationStatus':
          this.residence.bulk_meter_acc_no = null
          this.jmb_confirmation.bulk_meter_no = null
          this.jmb_confirmation.jmb_serial_no = null
          this.jmb_confirmation.confirmation_date = null
          this.jmb_confirmation.remark = null
          break
        default:
        // DO NOTHING
      }
    },
    setIsLoading(status) {
      this.$store.dispatch('misc/setIsLoading', status)
    }
  }
}
</script>
