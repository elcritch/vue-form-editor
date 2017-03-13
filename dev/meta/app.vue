<template lang="html">
	<div>
		<vue-form-creator v-model="schema" :model="model" :options="formOptions" >
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
				    "$schema": "http://json-schema.org/draft-04/schema#",
				    "title": "Product",
				    "description": "A product from Acme's catalog",
				    "type": "object",
				    "properties": {
				        "id": {
				            "metadata": 0,
				            "order": 0,
				            "description": "The unique identifier for a product",
				            "type": "integer"
				        },
				        "name": {
				            "order": 1,
				            "description": "Name of the product",
				            "type": "string"
				        }
				    },
				    "required": ["id", "name"]
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
