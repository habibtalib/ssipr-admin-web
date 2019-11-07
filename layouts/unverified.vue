<template>
  <div>
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="true"
    ></b-loading>

    <section class="hero has-background-grey-light is-fullheight">
      <div class="hero-head">
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
          </div>
        </nav>
      </div>
      <div class="hero-body mt3rem itemalingstart">
        <div class="container">
          <div class="columns is-full">
            <div class="column">
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

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      isLoading: 'misc/isLoading'
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
