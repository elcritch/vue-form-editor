<template lang="html">
  <div class="media">
    <div class="media-left">

      <div class="box">
        <h2>Vue Form Creator</h2>
        <span class="icon is-medium">
          <i class="fa fa-home"></i>
        </span>

        <dropdown>
          <a class="button is-primary">
            <span>Dropdown Menu</span>
            <span class="icon is-small">
              <i class="fa fa-angle-down"></i>
            </span>
          </a>
          <div slot="content">
            <menus>
              <a class="button is-danger">Black</a>

              <menu-item to="/meta">Members</menu-item>
              <menu-item to="/meta">Tickets</menu-item>
              <menu-item to="/meta">Articles</menu-item>
              <menu-item>
                <span>Settings</span>
                <menus slot="sub" type="float">
                  <menu-item icon="home" to="/meta">Main Nav</menu-item>
                  <menu-item icon="home" to="/meta">Sub Nav</menu-item>
                </menus>
              </menu-item>
            </menus>
          </div>
        </dropdown>
        Dropdown Menu
      </div>

      <nav class="panel box">
        <tabs type="boxed">
          <tab-item label="Schema">
            <textarea class="textarea" style="font-size: 70%; min-height: 400px; " placeholder="Textarea" v-model="jsonSchema" >
            </textarea>
          </tab-item>
          <tab-item label="Edit">

          </tab-item>
          <tab-item label="Field Order">
            <div class="panel-block">
              <p class="control has-icon columns">
                <span class="icon is-small">
                  <i class="fa fa-search"></i>
                </span>
                <input class="input is-small" type="text" placeholder="Search">
              </p>
            </div>
            <draggable v-model="fields">
              <transition-group name="list-test">
                <div class="list-test"
                    v-for="(field, index) in fields"
                    :key="index" >

                  {{field.label}}
                </div>
              </transition-group>
            </draggable>
          </tab-item>
        </tabs>

      </nav>


    </div>

    <div class="media-content ">
      <nav class="panel">
        <p class="panel-heading">
          Schema Fields
        </p>

        <draggable v-model="fields">
          <transition-group
              name="list-test"
              class="card" >

            <div class="level"
                :key="index"
                v-for="(field, index) in fields" >

              <!-- <h4>Field: {{field}}</h4> -->
              <div class="level-left">
                <form-editor :name="field.name" v-model="field.property" > </form-editor>
              </div>

              <div class="level-right">
                  <a class="icon is-small" v-on:click="handleOptionClick($event, index, field)">
                    <i class="fa fa-gear"></i>
                  </a>
              </div>
            </div>
          </transition-group>
        </draggable>

      </nav>
    </div>

  </div>
</template>

<script>

// <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  import draggable from 'vuedraggable'

  import DropBox from './DropBox.vue'
  import FormEditor from './FormEditor.vue'
  // import 'keen-ui/dist/keen-ui.min.css'
  // import 'flexboxgrid/dist/flexboxgrid.min.css'

	// import {each, isFunction, isNil, isArray, isString} from "lodash";
	import _ from "lodash";
  import Vue from 'vue';

  // import KeenUI from 'keen-ui';
  // Vue.use(KeenUI);

	export default {
    model: {
      prop: 'schema',
      event: 'change'
    },

		components: {
      DropBox, FormEditor, draggable
    },
		props: {
			schema: Object,

			model: Object,

			options: {
				type: Object,
				default()  {
					return {
						validateAfterLoad: false,
						validateAfterChanged: false
					};
				}
			},

			multiple: {
				type: Boolean,
				default: false
			},

			isNewModel: {
				type: Boolean,
				default: false
			}
		},

		data () {
			return {
        activeName: 'first',
        selectedOptions: [],
				errors: [], // Validation errors
        // fields: this.schema.fields.slice(),
        select1: '',
        select2: 'Number',
        fieldNames: [
          "Text",
          "Number",
          "Checkbox"
        ]
			};
		},

		computed: {
			fields: {
        get() {
          var fields = _.map(this.schema.properties, (value, key) => {
            return {name: key, property: value}
          });
          fields.sort((a,b) => {
            let lhs = a.property.order || -1
            let rhs = b.property.order || -1
            return lhs < rhs ? -1 * lhs : 1 * rhs
          })
  				return fields;
  			},
        set(fieldList) {
          for (var idx = 0; idx < fieldList.length; idx++) {
            var {property} = fieldList[idx]
            property.order = idx + 1;
          }
        }
      },
			jsonSchema: {
        get() {
          return JSON.stringify(this.schema, null, 2)
  			},
        set(value) {
          // console.log("computed jsonSchema -> update: ", value)
          let obj = JSON.parse(value)
          this.$emit("change", obj)
        }
      }
		},


		methods: {

      handleChange(value) {
        console.log(value);
      },

      // Clear validation errors
			clearValidationErrors() {
				this.errors.splice(0);

				_.each(this.$children, (child) => {
          if ("clearValidationErrors" in child)
  					child.clearValidationErrors();
				});
			},

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
  		},

      handleOptionClick(event, index, field) {
  			console.log("option click:\n\tevt: ", event, "\n\tindex: ", index, " field: ", field.model);

  		},

		}
	};

</script>


<style lang="css">

.list-test {
  transition: all 1.0s;
}

</style>
