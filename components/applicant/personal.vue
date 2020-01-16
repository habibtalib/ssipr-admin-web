<template>
  <article v-if="applicant" class="message is-dark">
    <div class="message-header">
      <p>Maklumat Peribadi</p>
    </div>
    <div class="message-body has-background-white">
      <div class="columns">
        <div class="column is-half">
          <b-field
            :label="$t('f.meterType')"
            :type="{ 'is-danger': errors.has('residenceMeterType') }"
            :message="errors.first('residenceMeterType')"
          >
            <div></div>
          </b-field>

          <b-field grouped>
            <b-field label="No. Identiti" expanded>
              <b-field>
                <b-select
                  v-model="applicant.ic_type"
                  @input="resetValue('ic_type')"
                >
                  <option v-for="(type, i) in icTypes" :key="i" :value="i">
                    {{ type }}
                  </option>
                </b-select>
                <b-field
                  :type="{ 'is-danger': errors.has('applicantId') }"
                  :message="errors.first('applicantId')"
                  expanded
                >
                  <b-input
                    v-model="applicant.ic"
                    v-validate="
                      applicant.ic_type == 0
                        ? 'required|digits:12'
                        : 'required|alpha_num'
                    "
                    name="applicantId"
                  ></b-input>
                </b-field>
              </b-field>
            </b-field>
          </b-field>

          <b-field
            :label="$t('f.name')"
            :type="{ 'is-danger': errors.has('applicantName') }"
            :message="errors.first('applicantName')"
          >
            <b-input
              v-model="applicant.name"
              v-validate="{ required: true, regex: /^[ A-Za-z@'/-]*$/ }"
              name="applicantName"
            ></b-input>
          </b-field>

          <b-field grouped>
            <b-field :label="$t('f.email')" expanded>
              <b-field>
                <b-select
                  v-model="applicant.is_using_rep_email"
                  @input="resetValue('email_owner')"
                >
                  <option :value="false">Pemohon</option>
                  <option :value="true">Wakil</option>
                </b-select>
                <b-field
                  :type="{ 'is-danger': errors.has('applicantEmail') }"
                  :message="errors.first('applicantEmail')"
                  expanded
                >
                  <b-input
                    v-model="applicant.email"
                    v-validate="applicant.phone_no ? 'email' : 'required|email'"
                    name="applicantEmail"
                  ></b-input>
                </b-field>
              </b-field>
            </b-field>
          </b-field>
        </div>
        <div class="column is-half">
          <b-field
            :label="$t('f.maritalStatus')"
            :type="{ 'is-danger': errors.has('applicantMaritalStatus') }"
            :message="errors.first('applicantMaritalStatus')"
          >
            <b-select
              v-model="applicant.marital_status"
              v-validate="'required'"
              :placeholder="$t('l.choose')"
              @input="resetValue('marital_status')"
              name="applicantMaritalStatus"
            >
              <option
                v-for="status in maritalStatuses"
                :key="status"
                :value="status"
              >
                {{ status }}
              </option>
            </b-select>
          </b-field>

          <b-field
            :label="$t('f.income')"
            :type="{
              'is-danger': errors.has('applicantIncome')
            }"
            :message="errors.first('applicantIncome')"
          >
            <b-input
              v-model="applicant.income"
              v-validate="'required|decimal:2|min_value:0'"
              name="applicantIncome"
              step="0.01"
              type="number"
            ></b-input>
          </b-field>

          <b-field
            :label="$t('f.pNo')"
            :type="{ 'is-danger': errors.has('applicantPNo') }"
            :message="errors.first('applicantPNo')"
          >
            <b-input
              v-model="applicant.phone_no"
              v-validate="applicant.email ? 'numeric' : 'required|numeric'"
              name="applicantPNo"
              placeholder="23456789"
            ></b-input>
          </b-field>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  inject: {
    $validator: '$validator'
  },
  props: {
    applicant: {
      type: Object,
      required: true
    },
    resetValue: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      telcos: [
        '6010',
        '6011',
        '6012',
        '6013',
        '6014',
        '6015',
        '6016',
        '6017',
        '6018',
        '6019'
      ]
    }
  },
  computed: {
    ...mapGetters({
      genders: 'lookup/genders',
      maritalStatuses: 'lookup/maritalStatuses',
      icTypes: 'lookup/icTypes'
    }),
    checkEmail() {
      return this.applicant.phone_no ? 'email' : 'required|email'
    },
    checkPhone() {
      return this.applicant.email ? 'numeric' : 'required|numeric'
    }
  }
}
</script>
