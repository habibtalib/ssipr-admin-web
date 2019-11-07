<template>
  <article class="message is-dark">
    <div class="message-header">
      <p>
        Maklumat Badan Pengurusan Bersama (JMB) / Perbadanan Pengurusan (MC)
      </p>
    </div>
    <div class="message-body has-background-white">
      <div class="columns">
        <div class="column is-half">
          <b-field
            :label="$t('f.jmbName')"
            :type="{ 'is-danger': errors.has('jmbName') }"
            :message="errors.first('jmbName')"
          >
            <b-input
              v-model="jmbConfirmation.jmb_name"
              v-validate="'required'"
              name="jmbName"
            ></b-input>
          </b-field>

          <b-field
            :label="$t('f.jmbEmail')"
            :type="{ 'is-danger': errors.has('jmbEmail') }"
            :message="errors.first('jmbEmail')"
          >
            <b-input
              v-model="jmbConfirmation.jmb_email"
              v-validate="'required|email'"
              name="jmbEmail"
            ></b-input>
          </b-field>

          <b-field
            :label="$t('f.noTeleJMB')"
            :type="{ 'is-danger': errors.has('jmbTeleNo') }"
            :message="errors.first('jmbTeleNo')"
          >
            <b-input
              v-model="jmbConfirmation.tele_no"
              v-validate="'required|numeric'"
              name="jmbTeleNo"
            ></b-input>
          </b-field>

          <b-field
            :label="$t('f.jmbRep')"
            :type="{ 'is-danger': errors.has('jmbRep') }"
            :message="errors.first('jmbRep')"
          >
            <b-input
              v-model="jmbConfirmation.jmb_rep_name"
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
              v-model="jmbConfirmation.jmb_rep_position"
              v-validate="'required'"
              name="jmbRepPost"
            ></b-input>
          </b-field>
        </div>
        <div class="column is-half">
          <b-field
            :label="$t('f.pukalAccNo')"
            :type="{
              'is-danger': errors.has('residenceBulkAccountNo')
            }"
            :message="errors.first('residenceBulkAccountNo')"
          >
            <b-input
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
              v-model="jmbConfirmation.bulk_meter_no"
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
              v-model="jmbConfirmation.jmb_serial_no"
              v-validate="'required'"
              name="jmbSerialNo"
            ></b-input>
          </b-field>

          <b-field
            :label="$t('f.confirmDate')"
            :type="{ 'is-danger': errors.has('jmbConfirmDate') }"
            :message="errors.first('jmbConfirmDate')"
          >
            <b-datepicker
              v-model="jmbConfirmation.confirmation_date"
              v-validate="'required'"
              icon="calendar-today"
              name="jmbConfirmDate"
            ></b-datepicker>
          </b-field>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  inject: {
    $validator: '$validator'
  },
  props: {
    jmbConfirmation: {
      type: Object,
      required: true
    },
    residence: {
      type: Object,
      required: true
    }
  }
}
</script>
