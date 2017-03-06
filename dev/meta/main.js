import Vue from "vue";
import VueFormGenerator from "../../src";
Vue.use(VueFormGenerator);

var VueRouter = require('vue-router');
Vue.use(VueRouter);

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
// Vue.use(ElementUI)

// 1. Define route components.
// These can be imported from other files
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/meta', component: Foo },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for routes: routes
})



import App from './app.vue';

new Vue({
  router: router,
  el: "#app",
  ...App
})
