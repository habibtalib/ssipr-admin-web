<template>
  <div class="steps">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="true"
    ></b-loading>

    <div class="step-item is-active">
      <div class="step-marker">1</div>
      <div class="step-details">
        <p class="step-title">Akaun</p>
      </div>
    </div>
    <div class="step-item">
      <div class="step-marker">2</div>
      <div class="step-details">
        <p class="step-title">Diri</p>
      </div>
    </div>
    <div class="step-item">
      <div class="step-marker">3</div>
      <div class="step-details">
        <p class="step-title">Pasangan</p>
      </div>
    </div>
    <div class="step-item">
      <div class="step-marker">4</div>
      <div class="step-details">
        <p class="step-title">Anak</p>
      </div>
    </div>
    <div class="step-item">
      <div class="step-marker">5</div>
      <div class="step-details">
        <p class="step-title">Alamat</p>
      </div>
    </div>
    <div class="step-item">
      <div class="step-marker">6</div>
      <div class="step-details">
        <p class="step-title">Pengesahan</p>
      </div>
    </div>
    <div class="steps-content">
      <form>
        <div class="step-content is-active">
          <div class="columns">
            <div class="column is-half is-offset-one-quarter">
              <b-field label="No. Kad Pengenalan">
                <b-input v-model="applicant.ic"></b-input>
              </b-field>

              <b-field label="E-mel">
                <b-input v-model="applicant.email"></b-input>
              </b-field>

              <b-field label="Kata Laluan">
                <b-input
                  v-model="applicant.password"
                  type="password"
                  password-reveal
                >
                </b-input>
              </b-field>
            </div>
          </div>
        </div>
        <div class="step-content">
          <div class="columns">
            <div class="column is-half is-offset-one-quarter">
              <b-field label="Nama">
                <b-input v-model="applicant.name"></b-input>
              </b-field>

              <b-field label="Jantina">
                <div class="block">
                  <b-radio v-model="applicant.gender" native-value="lelaki">
                    Lelaki
                  </b-radio>
                  <b-radio v-model="applicant.gender" native-value="perempuan">
                    Perempuan
                  </b-radio>
                </div>
              </b-field>

              <b-field label="Agama">
                <b-select v-model="applicant.religion" placeholder="Pilih">
                  <option
                    v-for="religion in religions"
                    :key="religion"
                    :value="religion"
                  >
                    {{ religion }}
                  </option>
                </b-select>
              </b-field>

              <b-field label="Tarikh Lahir">
                <b-datepicker v-model="applicant.dob" icon="calendar-today">
                </b-datepicker>
              </b-field>

              <b-field label="Tempat Lahir">
                <b-input v-model="applicant.pob"></b-input>
              </b-field>

              <b-field label="Tempoh Mastautin">
                <b-numberinput
                  v-model="applicant.residencePeriod"
                ></b-numberinput>
              </b-field>

              <b-field label="Pendapatan">
                <b-numberinput v-model="applicant.income"></b-numberinput>
              </b-field>
            </div>
          </div>
        </div>
        <div class="step-content">
          <div class="columns">
            <div class="column is-half is-offset-one-quarter">
              <b-field label="No. Kad Pengenalan">
                <b-input v-model="spouse.ic"></b-input>
              </b-field>

              <b-field label="Nama">
                <b-input v-model="spouse.name"></b-input>
              </b-field>

              <b-field label="Jantina">
                <div class="block">
                  <b-radio v-model="spouse.gender" native-value="lelaki">
                    Lelaki
                  </b-radio>
                  <b-radio v-model="spouse.gender" native-value="perempuan">
                    Perempuan
                  </b-radio>
                </div>
              </b-field>

              <b-field label="Pendapatan">
                <b-numberinput v-model="spouse.income"></b-numberinput>
              </b-field>

              <hr />

              <b-button
                type="is-primary is-fullwidth"
                outlined
                @click="addSpouse(spouse)"
              >
                Tambah
              </b-button>

              <br />

              <b-button type="is-info is-fullwidth" outlined>
                Jumlah pasangan: {{ spouses.length }}
              </b-button>
            </div>
          </div>
        </div>
        <div class="step-content">
          <div class="columns">
            <div class="column is-half is-offset-one-quarter">
              <b-field label="No. Kad Pengenalan">
                <b-input v-model="child.ic"></b-input>
              </b-field>

              <b-field label="Nama">
                <b-input v-model="child.name"></b-input>
              </b-field>

              <b-field label="Tarikh Lahir">
                <b-datepicker v-model="child.dob" icon="calendar-today">
                </b-datepicker>
              </b-field>

              <b-field label="Tempat Lahir">
                <b-input v-model="child.pob"></b-input>
              </b-field>

              <hr />

              <b-button
                type="is-primary is-fullwidth"
                outlined
                @click="addChild(child)"
              >
                Tambah
              </b-button>

              <br />

              <b-button type="is-info is-fullwidth" outlined>
                Jumlah anak: {{ childs.length }}
              </b-button>
            </div>
          </div>
        </div>
        <div class="step-content">
          <div class="columns">
            <div class="column is-half is-offset-one-quarter">
              <b-field label="Alamat">
                <b-input v-model="applicant.address1"></b-input>
              </b-field>
              <b-field>
                <b-input v-model="applicant.address2"></b-input>
              </b-field>
              <b-field>
                <b-input v-model="applicant.address3"></b-input>
              </b-field>
              <b-field label="Poskod">
                <b-input v-model="applicant.postcode"></b-input>
              </b-field>
              <b-field label="Daerah">
                <b-input v-model="applicant.district"></b-input>
              </b-field>
              <b-field label="Negeri">
                <b-input v-model="applicant.state"></b-input>
              </b-field>
            </div>
          </div>
        </div>
        <div class="step-content">
          <div class="columns">
            <div class="column is-half is-offset-one-quarter">
              <article class="message">
                <div class="message-body">
                  Dengan mengklik kotak setuju dibawah, anda dianggap telah
                  bersetuju dengan segala syarat SSIPR dan mengakui bahawa
                  maklumat yang diisi adalah benar.
                </div>
              </article>

              <div class="field">
                <b-checkbox v-model="isAccepted">
                  Setuju
                </b-checkbox>

                <hr />

                <b-button
                  type="is-primary is-fullwidth"
                  outlined
                  :disabled="!isAccepted"
                  @click="register()"
                >
                  Daftar
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="steps-actions">
      <div class="steps-action">
        <a href="#" data-nav="previous" class="button is-light">
          Kembali
        </a>
      </div>
      <div class="steps-action">
        <a href="#" data-nav="next" class="button is-light">
          Seterusnya
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import stepper from 'bulma-extensions/bulma-steps/dist/js/bulma-steps.js'
import { Dialog } from 'buefy/dist/components/dialog'

export default {
  data() {
    return {
      isLoading: false,
      isAccepted: false,
      childs: [],
      spouses: [],
      religions: ['Islam', 'Kristian', 'Lain-lain'],
      applicant: {
        ic: null,
        email: null,
        password: null,
        name: null,
        gender: null,
        religion: null,
        dob: null,
        pob: null,
        residencePeriod: null,
        income: null,
        address1: null,
        address2: null,
        address3: null,
        postcode: null,
        district: null,
        state: null
      },
      child: {
        ic: null,
        name: null,
        dob: null,
        pob: null
      },
      spouse: {
        ic: null,
        name: null,
        gender: null,
        income: null
      }
    }
  },
  mounted: function() {
    stepper.attach()
  },
  methods: {
    addChild(child) {
      this.childs.push(child)
      this.child = {
        ic: null,
        name: null,
        dob: null,
        pob: null
      }
    },
    addSpouse(spouse) {
      this.spouses.push(spouse)
      this.spouse = {
        ic: null,
        name: null,
        gender: null,
        income: null
      }
    },
    register() {
      this.isLoading = true
      this.$store
        .dispatch('admin_auth/register', {
          applicant: {
            ic: this.applicant.ic,
            email: this.applicant.email,
            name: this.applicant.name,
            gender: this.applicant.gender,
            dob: this.applicant.dob,
            password: this.applicant.password,
            password_confirmation: this.applicant.password,
            pob: this.applicant.pob,
            religion: this.applicant.religion,
            residence_period: this.applicant.residencePeriod,
            income: this.applicant.income,
            address_1: this.applicant.address1,
            address_2: this.applicant.address2,
            address_3: this.applicant.address3,
            postcode: this.applicant.postcode,
            district: this.applicant.district,
            state: this.applicant.state,
            childrens: this.childs,
            spouses: this.spouses
          }
        })
        .then(res => {
          this.isLoading = false
          if (res.error) {
            Dialog.alert('Maklumat tidak lengkap.')
          } else {
            this.$router.push('/account')
          }
        })
    }
  }
}
</script>
