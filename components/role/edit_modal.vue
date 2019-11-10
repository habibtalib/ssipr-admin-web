<template>
  <div>
    <form @submit.prevent="update()">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Kemas Kini Peranan</p>
        </header>
        <section class="modal-card-body">
          <b-field
            :label="$t('f.name')"
            :type="{ 'is-danger': errors.has('name') }"
            :message="errors.first('name')"
          >
            <b-input
              v-model="editedRole.name"
              v-validate="'required'"
              name="name"
            ></b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button type="button" class="button" @click="$parent.close()">
            Kembali
          </button>
          <button type="submit" class="button is-primary">Simpan</button>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Toast } from 'buefy/dist/components/toast'

export default {
  inject: {
    $validator: '$validator'
  },
  data() {
    return {
      editedRole: {}
    }
  },
  computed: {
    ...mapGetters({
      role: 'role/role'
    })
  },
  created() {
    Object.assign(this.editedRole, JSON.parse(JSON.stringify(this.role)))
  },
  methods: {
    update() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.setIsLoading(true)
          this.$store
            .dispatch('role/update', {
              role: this.editedRole
            })
            .then(res => {
              this.setIsLoading(false)

              if (res.error) {
                const errors = []

                for (const key in res.errors) {
                  if (res.errors.hasOwnProperty.call(key)) {
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
                  message: `Peranan berjaya dikemas kini.`,
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
