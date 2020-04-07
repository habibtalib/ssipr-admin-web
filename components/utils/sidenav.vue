<template>
  <b-menu>
    <b-menu-list label="Menu">
      <b-menu-item
        :active="currentPath == 'dashboard'"
        icon="home"
        label="Dashboard"
        to="/account"
        tag="nuxt-link"
      ></b-menu-item>
      <b-menu-item
        :active="currentPath == 'applicant'"
        icon="human"
        label="Pendaftaran"
        to="/applicant"
        tag="nuxt-link"
      ></b-menu-item>
      <b-menu-item :active="activeConds(['ipr'])" icon="folder-open">
        <template slot="label" slot-scope="props">
          Permohonan
          <b-icon
            :icon="props.expanded ? 'menu-down' : 'menu-up'"
            class="is-pulled-right"
          >
          </b-icon>
        </template>
        <b-menu-item
          :active="currentPath == '/ipr/SADE'"
          icon="file-plus"
          label="Skim Air Selangor"
          to="/ipr/SADE"
          tag="nuxt-link"
        ></b-menu-item>
        <!-- <b-menu-item
          :active="currentPath == '/ipr/KISS'"
          icon="file-plus"
          label="Kasih Ibu Smart Selangor"
          to="/ipr/KISS"
          tag="nuxt-link"
        ></b-menu-item> -->
        <!-- <b-menu-item
          v-for="p in programmes.list"
          :key="p.id"
          icon="file-plus"
          :label="p.ipr_code"
          to="/ipr/SADE"
          tag="nuxt-link"
          :active="activeConds(['ipr'])"
        ></b-menu-item> -->
      </b-menu-item>
      <b-menu-item
        v-if="isSuperAdmin"
        :active="activeConds(['agency', 'programme', 'role'])"
        icon="settings"
      >
        <template slot="label" slot-scope="props">
          Utiliti
          <b-icon
            :icon="props.expanded ? 'menu-down' : 'menu-up'"
            class="is-pulled-right"
          >
          </b-icon>
        </template>
        <b-menu-item
          :active="currentPath == 'agency'"
          icon="home"
          label="Agensi"
          to="/agency"
          tag="nuxt-link"
        ></b-menu-item>
        <b-menu-item
          :active="currentPath == 'programme'"
          icon="certificate"
          label="Program"
          to="/programme"
          tag="nuxt-link"
        ></b-menu-item>
        <b-menu-item
          :active="currentPath == 'role'"
          icon="lock"
          label="Peranan"
          to="/role"
          tag="nuxt-link"
        ></b-menu-item>
        <b-menu-item
          :active="currentPath == 'user'"
          icon="human"
          label="Users"
          to="/user"
          tag="nuxt-link"
        ></b-menu-item>
      </b-menu-item>
    </b-menu-list>
    <!-- <b-menu-list>
      <b-menu-item label="Pengguna" icon="account" to="/expo"> </b-menu-item>
    </b-menu-list>
    <b-menu-list label="Akaun">
      <b-menu-item label="Kemas Kini Akaun"></b-menu-item>
      <b-menu-item label="Log Keluar"></b-menu-item>
    </b-menu-list> -->
  </b-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    currentPath: {
      type: String,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    ...mapGetters({
      programmes: 'programme/programmes'
    }),
    isSuperAdmin() {
      return (
        this.currentUser &&
        this.currentUser.role &&
        this.currentUser.role.id === 1
      )
    }
  },
  created() {
    this.$store.dispatch('programme/setList')
  },
  methods: {
    activeConds(paths) {
      return paths.includes(this.currentPath)
    }
  }
}
</script>
