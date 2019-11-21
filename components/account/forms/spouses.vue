<template>
  <article class="message is-dark">
    <div class="message-header">
      <p>Maklumat Pasangan {{ spouses.length }}</p>
    </div>
    <div class="message-body has-background-white">
      <div class="columns">
        <div class="column is-full">
          <a @click="addSpouse()" class="button is-primary is-pulled-right"
            >Tambah</a
          >
        </div>
      </div>
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(spouse, i) in spouses" :key="spouse.idx">
                <td>
                  <b-field
                    :type="{
                      'is-danger': errors.has(
                        `${$t('f.spouseId')} ${spouse.idx}`
                      )
                    }"
                    :message="errors.first(`${$t('f.spouseId')} ${spouse.idx}`)"
                  >
                    <b-input
                      v-model="spouse.ic"
                      v-validate="'required|alpha_num'"
                      :name="`${$t('f.spouseId')} ${spouse.idx}`"
                    ></b-input>
                  </b-field>
                </td>
                <td>
                  <b-field
                    :type="{
                      'is-danger': errors.has(
                        `${$t('f.spouseName')} ${spouse.idx}`
                      )
                    }"
                    :message="
                      errors.first(`${$t('f.spouseName')} ${spouse.idx}`)
                    "
                  >
                    <b-input
                      v-model="spouse.name"
                      v-validate="{ required: true, regex: /^[ A-Za-z@'/-]*$/ }"
                      :name="`${$t('f.spouseName')} ${spouse.idx}`"
                    ></b-input>
                  </b-field>
                </td>
                <td>
                  <b-field
                    :type="{
                      'is-danger': errors.has(
                        `${$t('f.spouseEmail')} ${spouse.idx}`
                      )
                    }"
                    :message="
                      errors.first(`${$t('f.spouseEmail')} ${spouse.idx}`)
                    "
                  >
                    <b-input
                      v-model="spouse.email"
                      v-validate="'email'"
                      :name="`${$t('f.spouseEmail')} ${spouse.idx}`"
                    ></b-input>
                  </b-field>
                </td>
                <td>
                  <b-field
                    :type="{
                      'is-danger': errors.has(
                        `${$t('f.spouseTeleNo')} ${spouse.idx}`
                      )
                    }"
                    :message="
                      errors.first(`${$t('f.spouseTeleNo')} ${spouse.idx}`)
                    "
                  >
                    <b-input
                      v-model="spouse.tele_no"
                      v-validate="'numeric'"
                      :name="`${$t('f.spouseTeleNo')} ${spouse.idx}`"
                      placeholder="0123456789"
                    ></b-input>
                  </b-field>
                </td>
                <td>
                  <b-field
                    :type="{
                      'is-danger': errors.has(
                        `${$t('f.spouseIncome')} ${spouse.idx}`
                      )
                    }"
                    :message="
                      errors.first(`${$t('f.spouseIncome')} ${spouse.idx}`)
                    "
                  >
                    <b-input
                      v-model="spouse.income"
                      v-validate="'required|decimal:2|min_value:0'"
                      :name="`${$t('f.spouseIncome')} ${spouse.idx}`"
                      step="0.01"
                      type="number"
                    ></b-input>
                  </b-field>
                </td>
                <td class="has-text-centered">
                  <a
                    v-if="i != 0"
                    @click="removeSpouse(spouse)"
                    class="button is-warning"
                  >
                    Padam
                  </a>
                  <a v-else class="button is-warning" disabled>
                    Padam
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
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
    spouses: {
      type: Array,
      required: true
    }
  },
  methods: {
    addSpouse() {
      let idx = this.spouses.length + 1

      const newSpouse = {
        idx: idx,
        ic: null,
        name: null,
        income: null,
        tele_no: null,
        email: null
      }
      this.spouses.push(newSpouse)
      idx++
    },
    removeSpouse(spouse) {
      this.spouses.splice(this.spouses.indexOf(spouse), 1)
    }
  }
}
</script>
