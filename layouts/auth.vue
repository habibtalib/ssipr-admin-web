<template>
  <div class="columns is-gapless">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="true"
    ></b-loading>

    <div class="column is-half">
      <div class="hero is-danger is-fullheight with-bg">
        <div class="hero-body"></div>
      </div>
    </div>
    <div class="column is-half">
      <div class="hero is-white h100vh overflowauto">
        <div class="hero-head">
          <nav class="navbar has-shadow">
            <div class="navbar-brand">
              <nuxt-link class="navbar-item" to="/">
                <img src="~assets/img/ssiprlogo1.png" alt="Logo" />
              </nuxt-link>
              <span
                class="navbar-burger burger"
                data-target="navbarMenuHeroA"
                :class="{ 'is-active': showNav }"
                @click="showNav = !showNav"
              >
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div class="navbar-menu" :class="{ 'is-active': showNav }">
              <div class="navbar-end">
                <nuxt-link class="navbar-item" :to="authBtn[1]">
                  {{ authBtn[0] }}
                </nuxt-link>
                <!-- <b-dropdown
                  hoverable
                  position="is-bottom-left"
                  aria-role="menu"
                >
                  <a slot="trigger" class="navbar-item" role="button">
                    <span class="is-uppercase">{{ currLocale }}</span>
                    <b-icon icon="menu-down"></b-icon>
                  </a>
                  <nuxt-link class="navbar-item" :to="switchLocalePath('my')">
                    {{ $t('l.my') }}
                  </nuxt-link>
                  <nuxt-link class="navbar-item" :to="switchLocalePath('en')">
                    {{ $t('l.en') }}
                  </nuxt-link>
                </b-dropdown> -->
              </div>
            </div>
          </nav>
          <!-- <span class="tag is-light" style="margin-top:5px; margin-left:2.5px;"
            >Skim Air Darul Ehsan</span
          > -->
        </div>
        <div class="hero-body">
          <div class="container">
            <div class="columns">
              <div class="column is-half is-offset-one-quarter">
                <nuxt />
              </div>
            </div>
          </div>
        </div>
        <div class="hero-foot">
          <footer class="footer footpad has-text-centered">
            <div class="content">
              <p>© 2019 <strong>SSIPR</strong> {{ $t('l.copyright') }}</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      showNav: false
    }
  },
  computed: {
    ...mapGetters({
      authBtn: 'auth_layout/authBtn',
      isLoading: 'misc/isLoading'
    }),
    currLocale() {
      return 'my'
    }
  }
}
</script>
<style scoped>
.with-bg {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('~assets/img/bgsel2.jpg');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.footpad {
  padding: 1rem;
}
.h100vh {
  height: 100vh;
}
.overflowauto {
  overflow: auto;
}
.loginbtn {
  padding: 10px 0;
}
</style>
