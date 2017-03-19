<template lang="html">
  <div class="" v-if="Object.keys(property).length >= 1">
    <br />

      <p >
        <label class="label" v-if="header.type == 'key'">Key:</label>
        <label class="label" v-if="header.type == 'index'">Index:</label>
        <input class="input"
            v-model="header.key"
            :disabled="true" />
        <label class="label">Index:</label>
      </p>

      <p class="control" >
        <label class="label">Type:</label>
        <span class="select">
          <select v-model="property.type" v-on:change="typeChanged()">
            <option v-for="simpleType in simpleTypes.enum" >{{simpleType}}</option>
          </select>
        </span>
      </p>

      <p class="control" v-on:dblclick="handleChange($event)">
        <label class="label">Title:</label>
        <input class="input"
            field="title"
            v-model="property.title"
            :disabled="!('title' in property)" >
      </p>

      <p class="control" v-on:dblclick="handleChange($event)">
        <label class="label">Description:</label>
        <input class="input"
            field="description"
            v-model="property.description"
            :disabled="!('description' in property)" >
      </p>


      <p class="control" v-on:dblclick="handleChange($event)">
        <label class="label">Default:</label>
        <input
            v-if="property.type === 'string'"
            field="default"
            v-model="property.default"
            :disabled="!('default' in property)" >
        </input>
        <input-number
            v-if="property.type === 'integer'"
            field="default"
            v-model="property.default"
            :step="1"
            :disabled="!('default' in property)" >
        </input-number>
        <input-number
            v-if="property.type === 'number'"
            field="default"
            v-model="property.default"
            :step="0.2"
            :disabled="!('default' in property)" >
        </input-number>
        <b-switch
            v-if="property.type === 'boolean'"
            on-text="True"
            off-text="False"
            :disabled="!('default' in property)"
            v-model="property.default" >
        </b-switch>

      </p>

      <p class="control" v-on:dblclick="handleChange($event)">
        <label class="label">Schema:</label>
        <span class="select">
          <select>
            <option>Basic</option>
            <option disabled>Advanced</option>
          </select>
        </span>
      </p>

      <p class="control" v-on:dblclick="handleChange($event)">
        <label class="label">Schema Identifier:</label>
        <input class="input"
            v-model="property.id"
            :disabled="!('id' in property)" >
      </p>


    <br />
    <div class="box">
      <label>Header: {{header}}</label>
      <pre style="font-size: 80%; max-width: 25em; white-space: pre-wrap; " v-html="prettyJSON(property)" class="field-wrap">
      </pre>
      </div>
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
      header: Object
		},

		data () {
			return {
        simpleTypes: {
            enum: [ "array", "boolean", "integer", "null", "number", "object", "string" ]
        },

      };
		},
    // watch: {
    //   property(value) {
    //     console.log("HEADER: ", value, this.header)
    //   }
    // },

		methods: {

      typeChanged() {
        var newType = this.property.type
        if ('default' in this.property) {
          console.log("type changed")
          try {
            if (newType === 'string')
              this.property.default = String(this.property.default)
            else if (newType === 'number' || newType === 'integer')
              this.property.default = Number(this.property.default)
            else if (newType === 'bool')
              this.property.default = this.property.default ? true : false
            else
              this.$delete(this.property, 'default')
          } catch (error) {
            this.$delete(this.property, 'default')
          }
        }
      },

      handleChange(value) {
        var disabledElement = value.srcElement.querySelector("input[disabled], .is-disabled")
        var fieldName = disabledElement && disabledElement.attributes['field'].value

        if (fieldName && fieldName !== null) {
          this.$set(this.property, "" + fieldName, null)
        }
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
    					return `<span class="prettyjson-` + cls + `"  >` + match + `</span>`;
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
