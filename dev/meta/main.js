import Vue from "vue";
import VueFormGenerator from "../../src";
Vue.use(VueFormGenerator);

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
// Vue.use(ElementUI)

import App from './app.vue';

new Vue({
  el: "#app",
  ...App
})
