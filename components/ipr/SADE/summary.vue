<template>
  <div class="columns">
    <div class="column is-full">
      <div class="columns">
        <div class="column is-half">
          <h1 class="title is-5">Rumusan Permohonan</h1>
        </div>
      </div>
      <div class="columns">
        <div class="column is-half">
          <h4 class="title is-6">
            Tarik Permohonan : {{ applicationDate | formatDate }}
          </h4>
        </div>
      </div>

      <div class="columns">
        <div class="column is-full">
          <div class="is-divider" data-content="Maklumat Peribadi"></div>

          <div class="columns">
            <div class="column is-half">
              <b-field :label="$t('f.name')">
                {{ applicant.name }}
              </b-field>

              <b-field :label="$t('f.all_id_wo_passport')">
                {{ applicant.ic }}
              </b-field>

              <b-field
                :label="applicant.email ? $t('f.email') : $t('f.repEmail')"
              >
                {{ applicant.email ? applicant.email : applicant.rep_email }}
              </b-field>

              <b-field :label="$t('f.meterType')">
                {{ residence.meter_type }}
              </b-field>

              <b-field
                v-if="residence.meter_type == 'individu'"
                :label="$t('f.waterAccNo')"
              >
                {{ residence.individual_meter_acc_no }}
              </b-field>
            </div>
            <div class="column is-half">
              <b-field :label="$t('f.maritalStatus')">
                {{ applicant.marital_status }}
              </b-field>

              <b-field :label="$t('f.income')">
                {{ applicant.income }}
              </b-field>

              <b-field :label="$t('f.pNo')">
                {{ applicant.phone_no }}
              </b-field>
            </div>
          </div>
        </div>
      </div>

      <div v-if="applicant.marital_status == 'Berkahwin'" class="columns">
        <div class="column is-full">
          <div class="is-divider" data-content="Maklumat Pasangan"></div>

          <div class="columns">
            <div class="column is-full">
              <table class="table is-fullwidth is-bordered">
                <thead>
                  <tr>
                    <th>{{ $t('f.all_id') }}</th>
                    <th>{{ $t('f.name') }}</th>
                    <th>{{ $t('f.email') }}</th>
                    <th>{{ $t('f.pNo') }}</th>
                    <th>{{ $t('f.income') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="spouse in spouses" :key="spouse.ic">
                    <td>
                      <b-field>
                        {{ spouse.ic }}
                      </b-field>
                    </td>
                    <td>
                      <b-field>
                        {{ spouse.name }}
                      </b-field>
                    </td>
                    <td>
                      <b-field>
                        {{ spouse.email }}
                      </b-field>
                    </td>
                    <td>
                      <b-field>
                        {{ spouse.tele_no }}
                      </b-field>
                    </td>
                    <td>
                      <b-field>
                        {{ spouse.income }}
                      </b-field>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-full">
          <div class="is-divider" data-content="Maklumat Pendapatan"></div>

          <div class="columns">
            <div class="column is-full">
              <b-field label="Jumlah Pendapatan Pemohon">
                {{ applicant.income }}
              </b-field>

              <b-field label="Jumlah Pendapatan Pasangan">
                {{ totalSpousesSalaries }}
              </b-field>

              <b-field label="Jumlah Pendapatan Isi Rumah (RM)">
                {{ total }}
              </b-field>
            </div>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-full">
          <div class="is-divider" data-content="Maklumat Tempat Tinggal"></div>

          <div class="columns">
            <div class="column is-full">
              <b-field :label="$t('f.premisOwnershipStatus')">
                {{ residence.ownership_status }}
              </b-field>

              <b-field :label="$t('f.address')">
                {{
                  [
                    applicant.address_1,
                    applicant.address_2,
                    applicant.address_3,
                    applicant.postcode,
                    applicant.district,
                    applicant.state
                  ]
                    .filter(x => x)
                    .join(', ')
                }}
              </b-field>
            </div>
          </div>
        </div>
      </div>

      <div v-if="residence.meter_type == 'pukal'" class="columns">
        <div class="column is-full">
          <div
            class="is-divider"
            data-content="Maklumat Badan Pengurusan Bersama (JMB) / Perbadanan Pengurusan (MC)"
          ></div>

          <div class="columns">
            <div class="column is-half">
              <b-field :label="$t('f.jmbEmail')">
                {{ jmbConfirmation.jmb_email }}
              </b-field>

              <b-field :label="$t('f.jmbName')">
                {{ jmbConfirmation.jmb_name }}
              </b-field>

              <b-field :label="$t('f.noTeleJMB')">
                {{ jmbConfirmation.tele_no }}
              </b-field>

              <b-field :label="$t('f.jmbRep')">
                {{ jmbConfirmation.jmb_rep_name }}
              </b-field>

              <b-field :label="$t('f.jmbRepPost')">
                {{ jmbConfirmation.jmb_rep_position }}
              </b-field>
            </div>
            <div class="column is-half">
              <b-field v-if="applicationStatus" :label="$t('f.status')">
                {{ applicationStatus }}
              </b-field>

              <b-field
                v-if="jmbConfirmation.remark"
                :label="$t('f.reasonRejected')"
              >
                {{ jmbConfirmation.remark }}
              </b-field>

              <b-field
                v-if="residence.bulk_meter_acc_no"
                :label="$t('f.pukalAccNo')"
              >
                {{ residence.bulk_meter_acc_no }}
              </b-field>

              <b-field
                v-if="jmbConfirmation.bulk_meter_no"
                :label="$t('f.bulkMeterNo')"
              >
                {{ jmbConfirmation.bulk_meter_no }}
              </b-field>

              <b-field
                v-if="jmbConfirmation.jmb_serial_no"
                :label="$t('f.jmbSerialNo')"
              >
                {{ jmbConfirmation.jmb_serial_no }}
              </b-field>

              <b-field
                v-if="jmbConfirmation.confirmation_date"
                :label="$t('f.confirmDate')"
              >
                {{ jmbConfirmation.confirmation_date }}
              </b-field>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  filters: {
    formatDate(value) {
      if (value) {
        return moment(String(value), 'DD-MM-YYYY').isValid()
          ? moment(String(value), 'DD-MM-YYYY').format('DD/MM/YYYY')
          : value
      }
    }
  },
  props: {
    all: {
      type: Object,
      required: true
    },
    applicant: {
      type: Object,
      required: true
    },
    residence: {
      type: Object,
      required: true
    },
    jmbConfirmation: {
      type: Object,
      required: false,
      default: null
    },
    spouses: {
      type: Array,
      required: true
    },
    totalSpousesSalaries: {
      type: [String, Number],
      required: true
    },
    applicationStatus: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    total() {
      return (
        parseFloat(this.totalSpousesSalaries) +
        parseFloat(this.applicant.income)
      )
    },
    applicationDate() {
      return this.all.inserted_at || moment(Date.now()).format('DD/MM/YYYY')
    }
  }
}
</script>
