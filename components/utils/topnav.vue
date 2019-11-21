<template>
  <nav
    id="fixedNav"
    class="navbar has-background-white has-shadow is-fixed-top"
  >
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/account">
          <img src="~assets/img/ssiprlogo1.png" />
        </nuxt-link>
        <span class="navbar-burger burger" data-target="navbarMenu">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div id="navbarMenu" class="navbar-menu">
        <div class="navbar-end nav-spacer">
          <b-dropdown position="is-bottom-left" aria-role="menu">
            <a slot="trigger" class="navbar-item" role="button">
              <span>{{ currentUser.email }}</span>
              <b-icon icon="menu-down"></b-icon>
            </a>
            <b-dropdown-item @click="setting()" aria-role="listitem">
              Profile Setting
            </b-dropdown-item>
            <b-dropdown-item @click="logout()" aria-role="listitem">
              Logout
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    logout() {
      this.$store.dispatch('admin_auth/logout')
      this.$router.push('/')
    },
    setting() {
      this.$router.push('/auth/setting')
    }
  }
}
</script>
