<template>
  <div>
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="true"
    ></b-loading>

    <section class="hero has-background-grey-light is-fullheight">
      <div class="hero-head">
        <top-nav :current-user="currentUser"></top-nav>
      </div>
      <div class="hero-body mt3rem itemalingstart">
        <div class="container">
          <div class="columns is-full">
            <div class="column is-2">
              <side-nav :current-path="pathName"></side-nav>
            </div>
            <div class="column is-10">
              <nuxt />
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="footer footpad has-text-centered">
      <div class="content">
        <p>© 2019 <strong>SSIPR</strong> {{ $t('l.copyright') }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TopNav from '~/components/utils/topnav.vue'
import SideNav from '~/components/utils/sidenav.vue'

export default {
  middleware: ['check_admin_auth', 'admin_auth'],
  components: {
    TopNav,
    SideNav
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      currentUser: 'admin_auth/currentUser',
      isLoading: 'misc/isLoading',
      pathName: 'misc/pathName'
    })
  }
}
</script>

<style scoped>
.mt3rem {
  margin-top: 3rem;
}
.card-content.dashb {
  padding: 1rem;
}
h4.dashb {
  margin-bottom: 0;
}
.itemalingstart {
  align-items: start !important;
}
.footpad {
  padding: 1rem;
}
</style>
