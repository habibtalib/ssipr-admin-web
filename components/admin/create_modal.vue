<template>
  <div>
    <form @submit.prevent="create()">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Daftar Admin</p>
        </header>
        <section class="modal-card-body">
          <b-field
            :label="$t('f.id')"
            :type="{ 'is-danger': errors.has('id') }"
            :message="errors.first('id')"
          >
            <b-input
              v-model="admin.id_admin"
              v-validate="'required'"
              name="id_admin"
            ></b-input>
          </b-field>
          <b-field
            :label="$t('f.name')"
            :type="{ 'is-danger': errors.has('name') }"
            :message="errors.first('name')"
          >
            <b-input
              v-model="admin.name"
              v-validate="'required'"
              name="name"
            ></b-input>
          </b-field>

          <b-field
            :label="$t('f.email')"
            :type="{ 'is-danger': errors.has('email') }"
            :message="errors.first('email')"
          >
            <b-input
              v-model="admin.email"
              v-validate="'required'"
              name="email"
            ></b-input>
          </b-field>

          <b-field
            :label="$t('f.password')"
            :type="{ 'is-danger': errors.has('password') }"
            :message="errors.first('password')"
          >
            <b-input
              v-model="admin.password"
              v-validate="'required'"
              name="password"
              type="password"
            ></b-input>
          </b-field>

          <b-field
            :label="$t('f.passwordConfirm')"
            :type="{ 'is-danger': errors.has('confirm_password') }"
            :message="errors.first('confirm_password')"
          >
            <b-input
              v-model="admin.password_confirmation"
              v-validate="'required'"
              name="confirm_password"
              type="password"
            ></b-input>
          </b-field>

          <b-field
            :label="$t('f.agency')"
            :type="{ 'is-danger': errors.has('id_agensi') }"
            :message="errors.first('id_agensi')"
          >
            <b-select
              v-model="admin.agency_id"
              v-validate="'required'"
              placeholder="Pilih"
            >
              <option
                v-for="agency in agencies.list"
                :key="agency.id"
                :value="agency.id"
              >
                {{ agency.name }}
              </option>
            </b-select>
          </b-field>
          <b-field
            :label="$t('f.role')"
            :type="{ 'is-danger': errors.has('id_peranan') }"
            :message="errors.first('id_peranan')"
          >
            <b-select
              v-model="admin.role_id"
              v-validate="'required'"
              placeholder="Pilih"
            >
              <option
                v-for="role in roles.list"
                :key="role.id"
                :value="role.id"
              >
                {{ role.name }}
              </option>
            </b-select>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button @click="$parent.close()" type="button" class="button">
            Kembali
          </button>
          <button type="submit" class="button is-primary">Simpan</button>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
import { Dialog } from 'buefy/dist/components/dialog'

export default {
  inject: {
    $validator: '$validator'
  },
  props: {
    roles: {
      type: Object,
      required: true
    },
    agencies: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      admin: {
        name: null
      }
    }
  },
  methods: {
    create() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.setIsLoading(true)
          this.$store
            .dispatch('admin/create', {
              admin: this.admin
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
                this.$store.dispatch('admin/setList', this.queryParams())
                Dialog.alert({
                  message: 'Admin berjaya didaftarkan.',
                  type: 'is-success',
                  hasIcon: true,
                  icon: 'check-circle',
                  iconPack: 'fa'
                })
                this.$store.dispatch('admin/setList').then(res => {
                  this.$parent.close()
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
