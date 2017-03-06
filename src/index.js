
module.exports = {
	flexboxgridCss: require('flexboxgrid/dist/flexboxgrid.min.css'),
	keenUiCss: require('keen-ui/dist/keen-ui.min.css'),
	creatorComponent: require("./formCreator.vue"),
	component: require("./formGenerator.vue"),
	schema: require("./utils/schema.js"),
	validators: require("./utils/validators.js"),
	abstractField: require("./fields/abstractField").default,

	install(Vue) {
		Vue.component("VueFormGenerator", module.exports.component);
		Vue.component("VueFormCreator", module.exports.creatorComponent);
	}
};
