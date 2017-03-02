import Vue from "vue";
import VueFormGenerator from "../../src";
import BootstrapVue from 'bootstrap-vue';  // Globally register bootstrap-vue components Vue.use(BootstrapVue);

Vue.use(VueFormGenerator);
Vue.use(BootstrapVue);

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import App from './app.vue';

new Vue({
  el: "body",
  ...App
})
