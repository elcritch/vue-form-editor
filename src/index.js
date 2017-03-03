
module.exports = {
	elementUI: require('element-ui'),
	elementCSS: require('element-ui/lib/theme-default/index.css'),
	creatorComponent: require("./formCreator.vue"),
	component: require("./formGenerator.vue"),
	schema: require("./utils/schema.js"),
	validators: require("./utils/validators.js"),
	abstractField: require("./fields/abstractField").default,

	install(Vue) {
		console.log("Installing elements")
		// Vue.component("ElementUI", module.exports.elementUI)
		Vue.use(module.exports.elementUI)
		Vue.component("VueFormGenerator", module.exports.component);
		Vue.component("VueFormCreator", module.exports.creatorComponent);
	}
};
