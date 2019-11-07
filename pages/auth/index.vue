<template>
  <form>
    <div class="is-divider" :data-content="$t('l.login')"></div>

    <b-field :label="$t('f.ida')">
      <b-input v-model="id_admin"></b-input>
    </b-field>

    <b-field :label="$t('f.password')">
      <b-input v-model="password" type="password"> </b-input>
    </b-field>

    <p class="control loginbtn">
      <b-button type="is-primary is-fullwidth" outlined @click="login()">
        {{ $t('l.login') }}
      </b-button>
    </p>

    <p>
      <nuxt-link class="button is-text is-fullwidth" to="password">
        {{ $t('l.forgotPass') }}
      </nuxt-link>
    </p>
  </form>
</template>

<script>
import { Dialog } from 'buefy/dist/components/dialog'

export default {
  layout: 'auth',
  data() {
    return {
      id_admin: null,
      password: null
    }
  },
  created() {
    this.$store.dispatch('auth_layout/setAuthBtn', ['', ''])
  },
  methods: {
    login() {
      this.setIsLoading(true)
      this.$store
        .dispatch('admin_auth/login', {
          id_admin: this.id_admin,
          password: this.password
        })
        .then(res => {
          this.setIsLoading(false)

          if (res.error) {
            Dialog.alert('Butiran log masuk tidak sah.')
          } else {
            this.$router.push('/account')
          }
        })
    },
    setIsLoading(status) {
      this.$store.dispatch('misc/setIsLoading', status)
    }
  }
}
</script>
<style scoped>
.with-bg {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('~assets/img/bgsel.png');
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
