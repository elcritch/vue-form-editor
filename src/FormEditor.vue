<template lang="html">
  <div class="">

    <div class="card is-fullwidth">
      <drop-box >
        <!-- <div slot="component" class="message is-warning"> -->
        <div slot="component" class="card-content ">

          <div class="form-group" v-if="fieldVisible(field)" :class="getFieldRowClasses(field)">
            <label>{{ field.label }}
            <span class="help" v-if="field.help">
              <i class="icon"></i>
              <div class="helpText" v-html="field.help"></div>
            </span></label>
            <div class="field-wrap">
              <component :is="getFieldType(field)"
                  :disabled="fieldDisabled(field)"
                  :model="model"
                  :schema.sync="field"
                  @model-updated="modelUpdated"
                  @validated="onFieldValidated">
              </component>
              <div class="buttons" v-if="buttonVisibility(field)">
                <button v-for="btn in field.buttons" @click="btn.onclick(model, field)" :class="btn.classes">
                  {{ btn.label }}
                </button>
              </div>
            </div>
            <div class="hint" v-if="field.hint">
              {{ field.hint }}
            </div>
            <div class="errors" v-if="fieldErrors(field).length &gt; 0">
              <span v-for="(error, index) in fieldErrors(field)" track-by="index">
                {{ error }}
              </span>
            </div>
          </div>

        </div>
        <!-- <span slot="description">Options</span> -->
        <span slot="code" class="card-footer is-fullwidth">
          <div class="control is-fullwidth">
            Field Info:<br />
            <p>
              :is="<input disabled :value="getFieldType(field)" />" <br />
            </p>
            <p>
              :disabled="<input disabled :value="fieldDisabled(field)" />" <br />
            </p>
            <p>
              :model="<input disabled :value="model" />" <br />
            </p>
            <p>
              :schema.sync="<textarea disabled style="min-width: 400px; min-height: 150px; " :value="JSON.stringify(field, null, 2)" />" <br />
            </p>

            <vue-form-generator
                :schema="basicSchema"
                :model="{}"
                :options="{}">
            </vue-form-generator>
          </div>
        </span>
      </drop-box>
    </div>

  </div>
</template>

<script>

// <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  import fieldsMixin from './fieldsMixin.js'

  import DropBox from './DropBox.vue'
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

  const basicSchema = {
      fields: [
        {
          type: "dropbox",
          label: "Input",
          model: "input",
          readonly: false,
          featured: true,
          required: true,
          disabled: false,
          values: [ "input", "checklist", "checkbox", "dropbox", ]
        },
        {
          type: "dropbox",
          label: "Input Type",
          model: "inputType",
          readonly: false,
          featured: true,
          required: true,
          disabled: false,
          values: [ "input", "checklist", "checkbox", "dropbox" ]
        },
        {
          type: "input",
          inputType: "text",
          label: "Label",
          model: "label",
          readonly: false,
          featured: true,
          required: true,
          disabled: false,
        },
        {
          type: "input",
          inputType: "text",
          label: "Model",
          model: "model",
          readonly: false,
          featured: true,
          required: true,
          disabled: false,
        },
  			// type: "input",
  			// inputType: "hidden",
  			// label: "--- INPUT ---",
  			// model: "",
  			// styleClasses: "alert alert-info"
  		]
  }

	export default {

    mixins: [fieldsMixin],

		components: {
      DropBox
    },

		props: {
      field: Object,
		},

		data () {
			return {
        basicSchema: basicSchema,

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
