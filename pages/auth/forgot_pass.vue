<template>
  <form>
    <div :data-content="$t('l.forgotPass')" class="is-divider"></div>

    <b-field :label="$t('f.email')">
      <b-input v-model="email"></b-input>
    </b-field>

    <p class="control loginbtn">
      <b-button @click="submit()" type="is-primary is-fullwidth" outlined>
        {{ $t('l.submit') }}
      </b-button>
    </p>
  </form>
</template>

<script>
export default {
  layout: 'auth',
  components: {},
  created() {
    this.$store.dispatch('auth_layout/setAuthBtn', [this.$t('l.login'), '/'])
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
