// module.exports = {
// 	component: require("./formGenerator.vue"),
// 	schema: require("./utils/schema.js"),
// 	validators: require("./utils/validators.js"),
// 	abstractField: require("./fields/abstractField").default,

// 	install(Vue) {
// 		Vue.component("VueFormGenerator", module.exports.component);
// 	}
// };


import FormGenerator from './formGenerator.vue';

const VueFormGenerator {
  install(Vue, options) {
    Vue.component(FormGenerator.name, FormGenerator);
  }
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(FormGenerator)
}

export default VueFormGenerator;
