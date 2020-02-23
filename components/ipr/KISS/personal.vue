<template>
  <article class="message is-dark">
    <div class="message-header">
      <p>MAKLUMAT PEMOHON</p>
    </div>
    <div class="message-body has-background-white">
      <div class="columns">
        <div class="column is-half">
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

          <b-field label="Jantina">
            <div class="block">
              <b-radio :value="applicant.gender" native-value="lelaki">
                Lelaki
              </b-radio>
              <b-radio :value="applicant.gender" native-value="perempuan">
                Perempuan
              </b-radio>
            </div>
          </b-field>

          <b-field
            :type="{ 'is-danger': errors.has('applicantId') }"
            :message="errors.first('applicantId')"
            label="No. Kad Pengenalan / No. Polis / No. Tentera"
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

          <b-field grouped>
            <b-field :label="$t('f.email')" expanded>
              <b-field
                :type="{ 'is-danger': errors.has('applicantEmail') }"
                :message="errors.first('applicantEmail')"
                expanded
              >
                <b-input
                  v-model="applicant.email"
                  v-validate="'required|email'"
                  name="applicantEmail"
                ></b-input>
              </b-field>
            </b-field>
          </b-field>

          <b-field label="Tarikh Lahir">
            <b-datepicker
              :value="applicant.dob"
              icon="calendar-today"
            ></b-datepicker>
          </b-field>

          <b-field label="Tempat Lahir">
            <b-input v-model="applicant.pob"></b-input>
          </b-field>
        </div>
        <div class="column is-half">
          <b-field label="Warganegara">
            <!-- <b-input v-model="currentUser.citizen"></b-input> -->
            <b-select v-model="applicant.citizen" required>
              <option value="Ya">Ya</option>
              <option value="Tidak">Tidak</option>
            </b-select>
          </b-field>
          <b-field label="Bangsa">
            <!-- <b-input v-model="spouse.race"></b-input> -->
            <b-select v-model="applicant.race" required>
              <option value="Melayu">Melayu</option>
              <option value="Cina">Cina</option>
              <option value="India">India</option>
              <option value="Others">Lain-lain</option>
            </b-select>
          </b-field>
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
              v-validate="'required|numeric'"
              name="applicantPNo"
              placeholder="0123456789"
            ></b-input>
          </b-field>
          <b-field label="No Telefon Rumah">
            <b-input :value="applicant.home_no"></b-input>
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
    residence: {
      type: Object,
      required: true
    },
    resetValue: {
      type: Function,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      genders: 'lookup/genders',
      maritalStatuses: 'lookup/maritalStatuses',
      icTypes: 'lookup/icTypes'
    })
  }
}
</script>
