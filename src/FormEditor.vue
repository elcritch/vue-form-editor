<template lang="html">
  <div class="" v-if="property">

    <p class="control" v-on:dblclick="handleChange($event)">
      <label class="label">Identifier:</label>
      <input class="input"
          v-model="property.id"
          :disabled="!('id' in property)" >
    </p>

    <p class="control" v-on:dblclick="handleChange($event)">
      <label class="label">Title:</label>
      <input class="input"
          v-model="property.title"
          :disabled="!('title' in property)" >
    </p>

    <p class="control" v-on:dblclick="handleChange($event)">
      <label class="label">Description:</label>
      <input class="input"
          v-model="property.description"
          :disabled="!('description' in property)" >
    </p>

    <p class="control" v-on:dblclick="handleChange($event)">
      <label class="label">Schema:</label>
      <span class="select">
        <select>
          <option>Basic</option>
          <option>Advanced</option>
        </select>
      </span>
    </p>

    <p class="control" v-on:dblclick="handleChange($event)">
      <label class="label">Simple Type:</label>
      <span class="select">
        <select v-model="property.type">
          <option v-for="simpleType in simpleTypes.enum" >{{simpleType}}</option>
        </select>
      </span>
    </p>

    <p class="control" v-on:dblclick="handleChange($event)">
      <label class="label">Default:</label>
      <input class="input" :disabled="!('default' in property)" >
    </p>

    <br />

    <label>{{name}}</label>
    <pre style="font-size: 80%; max-width: 25em; white-space: pre-wrap; " v-html="prettyJSON(property)" class="field-wrap">
    </pre>
  </div>
</template>

<script>

  import DropBox from './DropBox.vue'

	import {each, isFunction, isNil, isArray, isString} from "lodash";
  import Vue from 'vue';

	export default {

    model: {
      prop: 'property',
      event: 'change'
    },


		components: {
      DropBox
    },

		props: {
      property: Object,
      name: String
		},

		data () {
			return {
        simpleTypes: {
            enum: [ "array", "boolean", "integer", "null", "number", "object", "string" ]
        },

      };
		},

		methods: {

      handleChange(value) {
        console.log(value);
      },

      prettyJSON: function(json) {
        // let json = JSON.stringify(obj)
  			if (json) {
  				json = JSON.stringify(json, undefined, 2);
  				json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  				return json.replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            function (match) {
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
    					return `<span class="prettyjson-` + cls + `" >` + match + `</span>`;
    				});
  			}
  		},

		}
	};

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
			pre .prettyjson-string { color: #885800; }
			pre .prettyjson-number { color: blue; }
			pre .prettyjson-boolean { color: magenta; }
			pre .prettyjson-null { color: red; }
			pre .prettyjson-key { color: green; }

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
