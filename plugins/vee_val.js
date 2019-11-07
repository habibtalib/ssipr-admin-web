import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import my from 'vee-validate/dist/locale/ms_MY'

Vue.use(VeeValidate)

Validator.localize('my', my)
