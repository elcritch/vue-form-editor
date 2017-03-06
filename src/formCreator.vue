<template lang="html">
  <div class="row">

    <div class="col-md-6  col-sm-4">
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
    </div>

    <div class="col-md-6 col-sm-8 ">
      <div class="box">

        <h4 >In UiPopover (creates a dropdown)</h4>


      </div>
    </div>

  </div>
</template>

<script>

// <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">


  // import 'keen-ui/dist/keen-ui.min.css'
  // import 'flexboxgrid/dist/flexboxgrid.min.css'

	import {each, isFunction, isNil, isArray, isString} from "lodash";
  import Vue from 'vue';
  // import KeenUI from 'keen-ui';
  // Vue.use(KeenUI);

  const menuOptions = [
      {
          id: 'edit',
          label: 'Edit',
          icon: 'edit',
          secondaryText: 'Ctrl+E'
      },
      {
          id: 'duplicate',
          label: 'Duplicate',
          icon: 'content_copy',
          secondaryText: 'Ctrl+D'
      },
      {
          id: 'share',
          label: 'Share',
          icon: 'share',
          secondaryText: 'Ctrl+Shift+S',
          disabled: true
      },
      {
          type: 'divider'
      },
      {
          id: 'delete',
          label: 'Delete',
          icon: 'delete',
          secondaryText: 'Del'
      }
  ];


	export default {
		components: {
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
        menuOptions: menuOptions,
        activeName: 'first',
        selectedOptions: [],
				errors: [], // Validation errors

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
			fields() {
				let res = [];
				if (this.schema) {
					each(this.schema.fields, (field) => {
						if (!this.multiple || field.multi === true)
							res.push(field);
					});
				}

				return res;
			}
		},


		methods: {

      handleChange(value) {
        console.log(value);
      },

      // Clear validation errors
			clearValidationErrors() {
				this.errors.splice(0);

				each(this.$children, (child) => {
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

      handleClick(tab, event) {
  			console.log(tab, event);
  		},

			// Validating the model properties
			validate() {
				this.clearValidationErrors();

				this.$children.forEach((child) => {
					if (isFunction(child.validate))
					{
						let errors = child.validate(true);
						errors.forEach((err) => {
							this.errors.push({
								field: child.schema,
								error: err
							});
						});
					}
				});

				let isValid = this.errors.length == 0;
				this.$emit("validated", isValid, this.errors);
				return isValid;
			},

		}
	};

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
