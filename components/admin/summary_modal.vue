<template>
  <div>
    <div class="card">
      <div class="card-content">
        <div class="content">
          <h1 class="has-text-weight-semibold is-size-4">
            {{ admin.name }}
            <span class="has-text-danger has-text-weight-light is-size-6">
              {{ admin.email }}
            </span>
          </h1>

          <b-field label="Nama"> </b-field>
        </div>
      </div>
      <footer class="card-footer hide-p">
        <a class="card-footer-item" @click="$parent.close()">Kembali</a>
        <a class="card-footer-item" @click="openEditModal">Kemas Kini</a>
        <a class="card-footer-item">Padam</a>
      </footer>
    </div>

    <b-modal :active.sync="editModalActive" scroll="keep" :width="400">
      <edit-modal></edit-modal>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import editModal from '~/components/admin/edit_modal.vue'

export default {
  components: {
    editModal
  },
  data() {
    return {
      editModalActive: false
    }
  },
  computed: {
    ...mapGetters({
      admin: 'admin/admin'
    })
  },
  methods: {
    openEditModal() {
      this.setIsLoading(true)
      this.$store.dispatch('admin/setAdmin', this.admin.id).then(res => {
        this.setIsLoading(false)
        this.selectedAdmin = this.$store.getters['admin/admin']
        this.editModalActive = true
      })
    },
    setIsLoading(status) {
      this.$store.dispatch('misc/setIsLoading', status)
    }
  }
}
</script>
