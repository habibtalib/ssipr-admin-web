<template>
  <article class="message is-dark">
    <div class="message-header">
      <p>Maklumat Tempat Tinggal</p>
    </div>
    <div class="message-body has-background-white">
      <div class="columns">
        <div class="column is-half">
          <b-field
            :label="$t('f.premisOwnershipStatus')"
            :type="{ 'is-danger': errors.has('residenceOwnership') }"
            :message="errors.first('residenceOwnership')"
          >
            <div>
              <b-radio
                v-model="residence.ownership_status"
                v-validate="'required'"
                native-value="pemilik"
                name="residenceOwnership"
              >
                Pemilik
              </b-radio>
              <b-radio
                v-model="residence.ownership_status"
                v-validate="'required'"
                native-value="penyewa"
                name="residenceOwnership"
              >
                Penyewa
              </b-radio>
            </div>
          </b-field>

          <p class="help has-text-danger is-size-6">
            * Alamat adalah seperti yang tertera di dalam bil air
          </p>

          <b-field
            :label="$t('f.address')"
            :type="{ 'is-danger': errors.has('applicantAddress1') }"
            :message="errors.first('applicantAddress1')"
          >
            <b-input
              v-model="applicant.address_1"
              v-validate="'required|max:50'"
              name="applicantAddress1"
            ></b-input>
          </b-field>

          <b-field
            :type="{ 'is-danger': errors.has('applicantAddress2') }"
            :message="errors.first('applicantAddress2')"
          >
            <b-input
              v-model="applicant.address_2"
              v-validate="'max:50'"
              name="applicantAddress2"
            ></b-input>
          </b-field>

          <b-field
            :type="{ 'is-danger': errors.has('applicantAddress3') }"
            :message="errors.first('applicantAddress3')"
          >
            <b-input
              v-model="applicant.address_3"
              v-validate="'max:50'"
              name="applicantAddress3"
              max="10"
            ></b-input>
          </b-field>

          <b-field
            :label="$t('f.postCode')"
            :type="{ 'is-danger': errors.has('applicantPostcode') }"
            :message="errors.first('applicantPostcode')"
          >
            <b-input
              v-model="applicant.postcode"
              v-validate="'required|numeric|max:5'"
              name="applicantPostcode"
              max="10"
            ></b-input>
          </b-field>

          <b-field
            :label="$t('f.state')"
            :type="{ 'is-danger': errors.has('applicantState') }"
            :message="errors.first('applicantState')"
          >
            <b-select
              v-model="applicant.state"
              v-validate="'required'"
              :placeholder="$t('l.choose')"
              name="applicantState"
            >
              <option
                v-for="state in countryStates"
                :key="state"
                :value="state"
                >{{ state }}</option
              >
            </b-select>
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
    }
  },
  computed: {
    ...mapGetters({
      countryStates: 'lookup/countryStates'
    })
  }
}
</script>
