<template lang="html">
	<div class="container">
		<b-alert :show="true" state="success" dismissible>   This is an alert </b-alert>

		<b-navbar >
			<b-nav-toggle target="nav_collapse"/>
			<a class="navbar-brand" to="/">
			<span>Bootstrap4</span> </a>
				<b-nav isNavBar>
					<b-nav-item>Support</b-nav-item>
					<b-nav-item>Docs</b-nav-item>
					<b-nav-item>Contact Us</b-nav-item>
				</b-nav>
		</b-navbar>

    <div class="panel panel-default">
      <div class="panel-heading">Form</div>
      <div class="panel-body">
        <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
      </div>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">Model</div>
      <div class="panel-body">
        <pre v-if="model" v-html="prettyJSON(model)"></pre>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import Multiselect from "vue-multiselect"
import VueFormGenerator from "../../src";

import Alert from 'bootstrap-vue/components/alert.vue'
// Vue.use('bAlert',Alert);

export default {
  components: {bAlert:Alert},
	methods: {
		prettyJSON: function(json) {
			if (json) {
				json = JSON.stringify(json, undefined, 4);
				json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
				return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
					var cls = "number";
					if (/^"/.test(match)) {
						if (/:$/.test(match)) {
							cls = "key";
						} else {
							cls = "string";
						}
					} else if (/true|false/.test(match)) {
						cls = "boolean";
					} else if (/null/.test(match)) {
						cls = "null";
					}
					return "<span class=\"" + cls + "\">" + match + "</span>";
				});
			}
		}
	},
	data() {
		return {
			model: {

				test: 1
			},
			schema: {
			    "id": "http://json-schema.org/draft-04/schema#",
			    "$schema": "http://json-schema.org/draft-04/schema#",
			    "description": "Core schema meta-schema",
			    "definitions": {
			        "schemaArray": {
			            "type": "array",
			            "minItems": 1,
			            "items": { "$ref": "#" }
			        },
			        "positiveInteger": {
			            "type": "integer",
			            "minimum": 0
			        },
			        "positiveIntegerDefault0": {
			            "allOf": [ { "$ref": "#/definitions/positiveInteger" }, { "default": 0 } ]
			        },
			        "simpleTypes": {
			            "enum": [ "array", "boolean", "integer", "null", "number", "object", "string" ]
			        },
			        "stringArray": {
			            "type": "array",
			            "items": { "type": "string" },
			            "minItems": 1,
			            "uniqueItems": true
			        }
			    },
			    "type": "object",
			    "properties": {
			        "id": {
			            "type": "string",
			            "format": "uri"
			        },
			        "$schema": {
			            "type": "string",
			            "format": "uri"
			        },
			        "title": {
			            "type": "string"
			        },
			        "description": {
			            "type": "string"
			        },
			        "default": {},
			        "multipleOf": {
			            "type": "number",
			            "minimum": 0,
			            "exclusiveMinimum": true
			        },
			        "maximum": {
			            "type": "number"
			        },
			        "exclusiveMaximum": {
			            "type": "boolean",
			            "default": false
			        },
			        "minimum": {
			            "type": "number"
			        },
			        "exclusiveMinimum": {
			            "type": "boolean",
			            "default": false
			        },
			        "maxLength": { "$ref": "#/definitions/positiveInteger" },
			        "minLength": { "$ref": "#/definitions/positiveIntegerDefault0" },
			        "pattern": {
			            "type": "string",
			            "format": "regex"
			        },
			        "additionalItems": {
			            "anyOf": [
			                { "type": "boolean" },
			                { "$ref": "#" }
			            ],
			            "default": {}
			        },
			        "items": {
			            "anyOf": [
			                { "$ref": "#" },
			                { "$ref": "#/definitions/schemaArray" }
			            ],
			            "default": {}
			        },
			        "maxItems": { "$ref": "#/definitions/positiveInteger" },
			        "minItems": { "$ref": "#/definitions/positiveIntegerDefault0" },
			        "uniqueItems": {
			            "type": "boolean",
			            "default": false
			        },
			        "maxProperties": { "$ref": "#/definitions/positiveInteger" },
			        "minProperties": { "$ref": "#/definitions/positiveIntegerDefault0" },
			        "required": { "$ref": "#/definitions/stringArray" },
			        "additionalProperties": {
			            "anyOf": [
			                { "type": "boolean" },
			                { "$ref": "#" }
			            ],
			            "default": {}
			        },
			        "definitions": {
			            "type": "object",
			            "additionalProperties": { "$ref": "#" },
			            "default": {}
			        },
			        "properties": {
			            "type": "object",
			            "additionalProperties": { "$ref": "#" },
			            "default": {}
			        },
			        "patternProperties": {
			            "type": "object",
			            "additionalProperties": { "$ref": "#" },
			            "default": {}
			        },
			        "dependencies": {
			            "type": "object",
			            "additionalProperties": {
			                "anyOf": [
			                    { "$ref": "#" },
			                    { "$ref": "#/definitions/stringArray" }
			                ]
			            }
			        },
			        "enum": {
			            "type": "array",
			            "minItems": 1,
			            "uniqueItems": true
			        },
			        "type": {
			            "anyOf": [
			                { "$ref": "#/definitions/simpleTypes" },
			                {
			                    "type": "array",
			                    "items": { "$ref": "#/definitions/simpleTypes" },
			                    "minItems": 1,
			                    "uniqueItems": true
			                }
			            ]
			        },
			        "allOf": { "$ref": "#/definitions/schemaArray" },
			        "anyOf": { "$ref": "#/definitions/schemaArray" },
			        "oneOf": { "$ref": "#/definitions/schemaArray" },
			        "not": { "$ref": "#" }
			    },
			    "dependencies": {
			        "exclusiveMaximum": [ "maximum" ],
			        "exclusiveMinimum": [ "minimum" ]
			    },
			    "default": {}
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
		html {
			font-family: Tahoma;
			font-size: 14px;
		}

		body {
			font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
			font-size: 14px;
			line-height: 1.42857143;
			color: #333;
		}

		pre {
			overflow: auto;
		}
			pre .string { color: #885800; }
			pre .number { color: blue; }
			pre .boolean { color: magenta; }
			pre .null { color: red; }
			pre .key { color: green; }

		.container {
			max-width: 970px;
			padding-right: 15px;
			padding-left: 15px;
			margin-right: auto;
			margin-left: auto;
		}

		h1 {
			text-align: center;
			font-size: 36px;
			margin-top: 20px;
			margin-bottom: 10px;
			font-weight: 500;
		}

		fieldset {
			border: 0;
		}

		.panel {
			margin-bottom: 20px;
			background-color: #fff;
			border: 1px solid transparent;
			border-radius: 4px;
			-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
			box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
			border-color: #ddd;
		}

		.panel-heading {
			color: #333;
			background-color: #f5f5f5;
			border-color: #ddd;

			padding: 10px 15px;
			border-bottom: 1px solid transparent;
			border-top-left-radius: 3px;
			border-top-right-radius: 3px;
		}

		.panel-body {
			padding: 15px;
		}

</style>
