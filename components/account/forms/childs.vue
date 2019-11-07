<template>
  <article class="message is-dark">
    <div class="message-header">
      <p>Maklumat Anak / Jagaan</p>
    </div>
    <div class="message-body has-background-white">
      <div class="columns">
        <div class="column is-full">
          <a class="button is-primary is-pulled-right" @click="addChild()"
            >Tambah</a
          >
        </div>
      </div>
      <div class="columns">
        <div class="column is-full">
          <table
            v-if="childs.length > 0"
            class="table is-fullwidth is-bordered"
          >
            <thead>
              <tr>
                <th>{{ $t('f.ic') }}</th>
                <th>{{ $t('f.name') }}</th>
                <th>{{ $t('f.dob') }}</th>
                <th>{{ $t('f.pob') }}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="child in childs" :key="child.idx">
                <td>
                  <b-field
                    :type="{
                      'is-danger': errors.has(`childIc_${child.idx}`)
                    }"
                    :message="errors.first(`childIc_${child.idx}`)"
                  >
                    <b-input
                      v-model="child.ic"
                      v-validate="'required|digits:12'"
                      :name="`childIc_${child.idx}`"
                    ></b-input>
                  </b-field>
                </td>
                <td>
                  <b-field
                    :type="{
                      'is-danger': errors.has(`childName_${child.idx}`)
                    }"
                    :message="errors.first(`childName_${child.idx}`)"
                  >
                    <b-input
                      v-model="child.name"
                      v-validate="{ required: true, regex: /^[ A-Za-z@'/-]*$/ }"
                      :name="`childName_${child.idx}`"
                    ></b-input>
                  </b-field>
                </td>
                <td>
                  <b-field
                    :type="{ 'is-danger': errors.has(`childDob_${child.idx}`) }"
                    :message="errors.first(`childDob_${child.idx}`)"
                  >
                    <b-datepicker
                      v-model="child.dob"
                      v-validate="'required'"
                      icon="calendar-today"
                      :name="`childDob_${child.idx}`"
                    ></b-datepicker>
                  </b-field>
                </td>
                <td>
                  <b-field
                    :type="{ 'is-danger': errors.has(`childPob_${child.idx}`) }"
                    :message="errors.first(`childPob_${child.idx}`)"
                  >
                    <b-input
                      v-model="child.pob"
                      v-validate="'required|alpha_spaces'"
                      :name="`childPob_${child.idx}`"
                    ></b-input>
                  </b-field>
                </td>
                <td class="has-text-centered">
                  <a class="button is-warning" @click="removeChild(child)">
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
    childs: {
      type: Array,
      required: true
    }
  },
  methods: {
    addChild() {
      const newChild = {
        idx: Math.random(),
        ic: null,
        name: null,
        income: null,
        tele_no: null,
        email: null
      }
      this.childs.push(newChild)
    },
    removeChild(child) {
      this.childs.splice(this.childs.indexOf(child), 1)
    }
  }
}
</script>
