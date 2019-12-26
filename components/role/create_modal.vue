<template>
  <div>
    <form @submit.prevent="create()">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Tambah Peranan</p>
        </header>
        <section class="modal-card-body">
          <b-field
            :label="$t('f.name')"
            :type="{ 'is-danger': errors.has('name') }"
            :message="errors.first('name')"
          >
            <b-input
              v-model="role.name"
              v-validate="'required'"
              name="name"
            ></b-input>
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
import { Toast } from 'buefy/dist/components/toast'

export default {
  inject: {
    $validator: '$validator'
  },
  data() {
    return {
      role: {
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
            .dispatch('role/create', {
              role: this.role
            })
            .then(res => {
              this.setIsLoading(false)

              if (res.error) {
                const errors = []

                for (const key in res.errors) {
                  if ({}.hasOwnProperty.call(res.errors, key)) {
                    for (const subKey in res.errors[key]) {
                      errors.push(
                        key +
                          ' ' +
                          subKey +
                          ' ' +
                          res.errors[key][subKey].join(', ')
                      )
                    }
                  }
                }

                Toast.open({
                  duration: 5000,
                  message: errors.join(', '),
                  type: 'is-danger'
                })
              } else {
                Toast.open({
                  duration: 5000,
                  message: `Peranan berjaya ditambah.`,
                  type: 'is-success'
                })
                this.$store.dispatch('role/setList').then(res => {
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
