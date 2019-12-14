<template>
  <div>
    <div class="card">
      <div class="card-content">
        <div class="content">
          <h1 class="has-text-weight-semibold is-size-4">
            {{ role.name }}
            <span class="has-text-danger has-text-weight-light is-size-6">
              {{ role.inserted_at | formatDate }}
            </span>
          </h1>

          <b-field label="Senarai Pengguna">
            Coming Soon
          </b-field>
        </div>
      </div>
      <footer class="card-footer hide-p">
        <a @click="$parent.close()" class="card-footer-item">Kembali</a>
        <a @click="openEditModal" class="card-footer-item">Kemas Kini</a>
        <a class="card-footer-item">Padam</a>
      </footer>
    </div>

    <b-modal :active.sync="editModalActive" :width="400" scroll="keep">
      <edit-modal></edit-modal>
    </b-modal>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import editModal from '~/components/role/edit_modal.vue'

export default {
  components: {
    editModal
  },
  filters: {
    formatDate(value) {
      if (value) {
        return moment(String(value), 'DD-MM-YYYY').isValid()
          ? moment(String(value), 'DD-MM-YYYY').format('DD/MM/YYYY')
          : value
      }
    }
  },
  data() {
    return {
      editModalActive: false
    }
  },
  computed: {
    ...mapGetters({
      role: 'role/role'
    })
  },
  methods: {
    openEditModal() {
      this.setIsLoading(true)
      this.$store.dispatch('role/setRole', this.role.id).then(res => {
        this.setIsLoading(false)
        this.selectedRole = this.$store.getters['role/role']
        this.editModalActive = true
      })
    },
    setIsLoading(status) {
      this.$store.dispatch('misc/setIsLoading', status)
    }
  }
}
</script>
