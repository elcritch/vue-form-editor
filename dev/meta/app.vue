<template lang="html">
	<div>
		<vue-form-creator :schema="schema" :model="model" :options="formOptions" >
		</vue-form-creator>
	</div>
</template>

<script>
// import Vue from "vue";
// import Multiselect from "vue-multiselect"
// import VueFormGenerator from "../../src";

export default {
	methods: {
		handleClick(tab, event) {
			console.log(tab, event);
		},
	},
	data() {
		return {

			model: {

				test: 1
			},
			schema: {
				fields: [
					{
						type: "input",
						inputType: "text",
						label: "ID",
						model: "id",
						readonly: true,
						featured: false,
						disabled: true
					},
					{
						type: "input",
						inputType: "text",
						label: "Name",
						model: "name",
						readonly: false,
						featured: true,
						required: true,
						disabled: false,
						placeholder: "User's name",
						// validator: VueFormGenerator.validators.string
					},
					{
						type: "input",
						inputType: "password",
						label: "Password",
						model: "password",
						min: 6,
						required: true,
						hint: "Minimum 6 characters",
						// validator: VueFormGenerator.validators.string
					},
					{
						type: "input",
						inputType: "email",
						label: "E-mail",
						model: "email",
						placeholder: "User's e-mail address",
						// validator: VueFormGenerator.validators.email
					},
					{
						type: "checklist",
						label: "Skills",
						model: "skills",
						required: true,
						values: [
							"HTML5",
							"Javascript",
							"CSS3",
							"CoffeeScript",
							"AngularJS",
							"ReactJS",
							"VueJS"
						],
						// validator: VueFormGenerator.validators.array
					},
					{
						type: "checkbox",
						label: "Status",
						model: "status",
						multi: true,
						readonly: false,
						featured: false,
						disabled: false,
						default: true
					}
				]
			},
			formOptions: {
				// validateAfterLoad: true,
				// validateAfterChanged: true
			}
		}
	}
}
</script>

<style lang="css">
*,
*::before,
*::after {
    box-sizing: border-box;
}

html {
    font-size: 100%;
}

</style>
