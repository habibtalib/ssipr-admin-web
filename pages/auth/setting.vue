<template>
  <div class="columns">
    <div class="column">
      <h1 class="has-text-weight-semibold is-size-4">
        Profile Setting
      </h1>

      <br />

      <form @submit.prevent="update()">
        <article class="message is-dark">
          <div class="message-header">
            <p>Maklumat Akaun</p>
          </div>
          <div class="message-body has-background-white">
            <div class="columns">
              <div class="column is-5">
                <b-field label="Nama">
                  <b-input :value="currentUser.name" disabled></b-input>
                </b-field>
              </div>
              <div class="column is-5">
                <b-field label="Emel">
                  <b-input :value="currentUser.email" disabled></b-input>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column is-5">
                <b-field
                  label="Kata Laluan"
                  :type="{ 'is-danger': errors.has('password') }"
                  :message="errors.first('password')"
                >
                  <b-input
                    v-model="password"
                    v-validate="'required'"
                    type="password"
                  ></b-input>
                </b-field>
              </div>
              <div class="column is-5">
                <b-field
                  label="Sahkan Kata Laluan"
                  :type="{ 'is-danger': errors.has('confirm_password') }"
                  :message="errors.first('confirm_password')"
                >
                  <b-input
                    v-model="password_confirmation"
                    v-validate="'required'"
                    type="password"
                  ></b-input>
                </b-field>
              </div>
            </div>
          </div>
        </article>

        <hr />

        <button
          type="submit"
          class="button is-primary is-fullwidth is-outlined"
        >
          Ubah
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'buefy/dist/components/dialog'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      password_confirmation: null,
      password: null
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'admin_auth/currentUser'
    })
  },
  created() {
    this.$store.dispatch('admin_auth/setCurrentUser')
  },
  methods: {
    update() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.setIsLoading(true)
          this.$store
            .dispatch('admin/update', {
              admin: {
                id: this.currentUser.id_admin,
                password: this.password,
                password_confirmation: this.password_confirmation
              }
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
                  message: 'Maklumat berjaya dikemaskini.',
                  type: 'is-success',
                  hasIcon: true,
                  icon: 'check-circle',
                  iconPack: 'fa'
                })
              }
            })
        }
      })
    },
    setIsLoading(status) {
      this.$store.dispatch('misc/setIsLoading', status)
    }
  }
}
</script>
