<template>
  <b-menu>
    <b-menu-list label="Menu">
      <b-menu-item
        icon="home"
        label="Dashboard"
        to="/account"
        tag="nuxt-link"
        :active="currentPath == 'dashboard'"
      ></b-menu-item>
      <b-menu-item
        icon="file-plus"
        label="Permohonan"
        to="/ipr/SADE"
        tag="nuxt-link"
        :active="currentPath == 'ipr'"
      ></b-menu-item>
      <!-- <b-menu-item icon="folder-open" :active="activeConds(['ipr'])">
        <template slot="label" slot-scope="props">
          Permohonan
          <b-icon
            class="is-pulled-right"
            :icon="props.expanded ? 'menu-down' : 'menu-up'"
          >
          </b-icon>
        </template>
        <b-menu-item
          v-for="p in programmes.list"
          :key="p.id"
          icon="file-plus"
          :label="p.ipr_code"
          to="/ipr/SADE"
          tag="nuxt-link"
          :active="activeConds(['ipr'])"
        ></b-menu-item>
      </b-menu-item> -->
      <!-- <b-menu-item
        icon="settings"
        :active="activeConds(['agency', 'programme', 'role'])"
      >
        <template slot="label" slot-scope="props">
          Utiliti
          <b-icon
            class="is-pulled-right"
            :icon="props.expanded ? 'menu-down' : 'menu-up'"
          >
          </b-icon>
        </template>
        <b-menu-item
          icon="home"
          label="Agensi"
          to="/agency"
          tag="nuxt-link"
          :active="currentPath == 'agency'"
        ></b-menu-item>
        <b-menu-item
          icon="certificate"
          label="Program"
          to="/programme"
          tag="nuxt-link"
          :active="currentPath == 'programme'"
        ></b-menu-item>
        <b-menu-item
          icon="lock"
          label="Peranan"
          to="/role"
          tag="nuxt-link"
          :active="currentPath == 'role'"
        ></b-menu-item>
      </b-menu-item> -->
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
    })
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
